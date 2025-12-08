import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loader from "../../../Shared/Loader/Loader";

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
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

      {/* Role Filter */}
      <div className="mb-4">
        <label className="font-semibold mr-2">Filter by Role:</label>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="select select-bordered"
        >
          <option value="All">All</option>
          <option value="Student">Student</option>
          <option value="Moderator">Moderator</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
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
                <td colSpan="5" className="text-center text-gray-500">
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
                  <td className="text-center">
                    <div className="inline-flex items-center gap-2">
                      {/* Role Change */}
                      {user.role !== "Admin" && (
                        <select
                          value={user.role}
                          onChange={(e) =>
                            handleRoleChange(user._id, e.target.value)
                          }
                          className="select select-sm select-bordered"
                        >
                          <option value="Student">Student</option>
                          <option value="Moderator">Moderator</option>
                        </select>
                      )}

                      {/* Delete User */}
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </div>
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
