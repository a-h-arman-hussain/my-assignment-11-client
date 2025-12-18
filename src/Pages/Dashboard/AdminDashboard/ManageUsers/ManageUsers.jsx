import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loader from "../../../Shared/Loader/Loader";
import { MdOutlineDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

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

      Swal.fire({
        icon: "success",
        title: "Role Updated!",
        text: "User role updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      queryClient.invalidateQueries(["users"]);
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update role. Please try again.",
      });
    }
  };

  const handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete user",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/users/${userId}`);

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "User deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      queryClient.invalidateQueries(["users"]);
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: "Failed to delete user. Please try again.",
      });
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
          <tbody className="text-sm">
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
                  <td>
                    <div className="flex items-center gap-1 text-primary">
                      <img
                        src={user.photo}
                        alt=""
                        className="w-6 h-6 rounded-full"
                      />
                      {user.name}
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`text-white px-2 py-0.5 font-semibold rounded-lg ${
                        user.role === "Moderator" ? "bg-primary" : "bg-blue-500"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
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
