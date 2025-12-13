import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loader from "../../../Shared/Loader/Loader";
import { MdOutlineDeleteForever } from "react-icons/md";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [roleFilter, setRoleFilter] = useState("All");

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axiosSecure.patch(`/users/${userId}/role`, { role: newRole });
      alert("Role updated successfully!");
      queryClient.invalidateQueries(["users"]);
    } catch (err) {
      console.error(err);
      alert("Failed to update role");
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axiosSecure.delete(`/users/${userId}`);
      alert("User deleted successfully!");
      queryClient.invalidateQueries(["users"]);
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  if (isLoading) return <Loader />;

  const filteredUsers =
    roleFilter === "All"
      ? users.filter((u) => u.role !== "Admin")
      : users.filter(
          (user) => user.role === roleFilter && user.role !== "Admin"
        );

  return (
    <div className="min-h-screen p-2 md:p-6 bg-base-200 text-neutral max-w-11/12 mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-primary text-center">
        Manage Users
      </h1>

      {/* Role Filter */}
      <div className="mb-4 flex items-center gap-3">
        <label className="font-semibold text-neutral">Filter by Role:</label>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="select select-bordered select-sm bg-base-100 text-neutral"
        >
          <option value="All">All</option>
          <option value="Student">Student</option>
          <option value="Moderator">Moderator</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow border border-base-300 p-4">
        <table className="table table-zebra w-full">
          <thead className="bg-base-300 text-neutral font-semibold">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td className="flex gap-2 justify-center">
                    {user.role !== "Admin" && (
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(user._id, e.target.value)
                        }
                        className="select select-sm select-bordered bg-base-100 text-neutral"
                      >
                        <option value="Student">Student</option>
                        <option value="Moderator">Moderator</option>
                      </select>
                    )}
                    <button
                      className="btn btn-sm btn-error text-white"
                      onClick={() => handleDelete(user._id)}
                    >
                      <MdOutlineDeleteForever size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
