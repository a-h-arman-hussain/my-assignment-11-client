import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loader from "../../../Shared/Loader/Loader";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaUserShield, FaUserGraduate, FaFilter } from "react-icons/fa";
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
        showConfirmButton: false,
        timer: 1500,
        customClass: { popup: "rounded-[2rem]" },
      });
      queryClient.invalidateQueries(["users"]);
    } catch (err) {
      Swal.fire({ icon: "error", title: "Update Failed" });
    }
  };

  const handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--color-error, #f87272)",
      confirmButtonText: "Yes, Delete",
      customClass: { popup: "rounded-[2rem]" },
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/users/${userId}`);
        queryClient.invalidateQueries(["users"]);
      } catch (err) {
        Swal.fire({ icon: "error", title: "Delete Failed" });
      }
    }
  };

  if (isLoading) return <Loader />;

  const filteredUsers = users.filter((u) => {
    const isNotAdmin = u.role !== "Admin";
    const matchesFilter = roleFilter === "All" || u.role === roleFilter;
    return isNotAdmin && matchesFilter;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-10"
    >
      {/* User Management Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 pb-6 border-b border-base-200">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          {/* ১. সাব-টাইটেল ইন্ডিকেটর */}
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-primary/40"></div>
            <span className="text-primary font-black tracking-[0.3em] uppercase text-[10px]">
              Access Control
            </span>
          </div>

          {/* ২. মেইন টাইটেল - Standardized Typography */}
          <h1 className="text-3xl md:text-5xl font-black text-base-content uppercase tracking-tighter leading-none">
            User <span className="text-primary">Management</span>
          </h1>

          {/* ৩. ডাইনামিক স্ট্যাটাস লাইন */}
          <p className="text-[10px] md:text-xs font-bold opacity-40 uppercase tracking-[0.2em] mt-3 ml-1">
            Total{" "}
            <span className="text-primary/80">{filteredUsers.length}</span>{" "}
            platform members found
          </p>
        </motion.div>

        {/* ৪. প্রিমিয়াম ফিল্টার ড্রপডাউন */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 bg-base-200/50 p-1.5 pl-6 rounded-[2rem] border border-base-300 shadow-sm hover:border-primary/30 transition-all duration-300 group"
        >
          <FaFilter className="text-primary group-hover:scale-110 transition-transform" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="select select-ghost select-sm focus:bg-transparent font-black text-[10px] uppercase tracking-widest focus:outline-none border-none"
          >
            <option value="All">All Roles</option>
            <option value="Student">Students</option>
            <option value="Moderator">Moderators</option>
            <option value="Admin">Admins</option>
          </select>
        </motion.div>
      </header>

      {/* ২. ইউজার টেবিল কন্টেইনার */}
      <div className="bg-base-100 rounded-[2.5rem] border border-base-300 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200/50">
              <tr className="border-none text-neutral/40 uppercase text-[10px] tracking-[0.2em]">
                <th className="py-6 pl-8">User Info</th>
                <th>Current Role</th>
                <th className="text-center">Modify Access</th>
                <th className="pr-8 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-base-200 last:border-none hover:bg-base-200/20 transition-colors"
                >
                  <td className="py-5 pl-8">
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-2xl ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img
                            src={
                              user.photo || "https://i.ibb.co/mR79Y6B/user.png"
                            }
                            alt={user.name}
                          />
                        </div>
                      </div>
                      <div>
                        <p className="font-black text-neutral leading-none">
                          {user.name}
                        </p>
                        <p className="text-[11px] font-medium opacity-50 mt-1">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div
                      className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${
                        user.role === "Moderator"
                          ? "text-secondary"
                          : "text-primary"
                      }`}
                    >
                      {user.role === "Moderator" ? (
                        <FaUserShield />
                      ) : (
                        <FaUserGraduate />
                      )}
                      {user.role}
                    </div>
                  </td>
                  <td className="text-center">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      className="select select-sm select-bordered rounded-xl font-bold text-xs bg-base-200"
                    >
                      <option value="Student">Student</option>
                      <option value="Moderator">Moderator</option>
                    </select>
                  </td>
                  <td className="pr-8 text-right">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="p-3 bg-error/10 text-error rounded-2xl hover:bg-error hover:text-white transition-all shadow-sm"
                    >
                      <MdOutlineDeleteForever size={22} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default ManageUsers;
