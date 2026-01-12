import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loader from "../../../Shared/Loader/Loader";
import EditScholarshipModal from "./EditScholarshipModal";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FiBriefcase } from "react-icons/fi";

const ManageScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editingScholarship, setEditingScholarship] = useState(null);

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-scholarships");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--color-primary)",
      cancelButtonColor: "#f87272",
      confirmButtonText: "Yes, Delete!",
      customClass: { popup: "rounded-[2rem]" },
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/scholarships/${id}`);
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Scholarship removed successfully.",
        showConfirmButton: false,
        timer: 1500,
        customClass: { popup: "rounded-[2rem]" },
      });
      queryClient.invalidateQueries(["scholarships"]);
    } catch (err) {
      Swal.fire({ icon: "error", title: "Oops!", text: "Failed to delete." });
    }
  };

  if (isLoading) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-10"
    >
      {/* Dashboard Page Header - Manage Scholarships */}
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
              Scholarship Inventory
            </span>
          </div>

          {/* ২. মেইন টাইটেল - Standardized Typography */}
          <h1 className="text-3xl md:text-5xl font-black text-base-content uppercase tracking-tighter leading-none">
            Manage <span className="text-primary">Scholarships</span>
          </h1>

          {/* ৩. ডেসক্রিপশন */}
          <p className="text-[10px] md:text-xs font-bold opacity-40 uppercase tracking-[0.2em] mt-3 ml-1">
            Control and monitor all published global opportunities
          </p>
        </motion.div>

        {/* ৪. ডাইনামিক কাউন্টার ব্যাজ - Premium Look */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-primary text-primary-content px-6 py-3 rounded-[1.5rem] flex items-center gap-3 shadow-lg shadow-primary/20"
        >
          <FiBriefcase className="text-lg" />
          <span className="font-black uppercase tracking-widest text-xs">
            Total Listings: {scholarships.length}
          </span>
        </motion.div>
      </header>

      {/* ২. টেবিল কন্টেইনার (Global Rule: Rounded-3xl) */}
      <div className="bg-base-100 rounded-[2.5rem] border border-base-300 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Table Head */}
            <thead className="bg-base-200/50">
              <tr className="border-none text-neutral/50 uppercase text-[11px] tracking-widest">
                <th className="py-6 pl-8">Scholarship & University</th>
                <th>Location</th>
                <th>Subject & Degree</th>
                <th>Deadline</th>
                <th className="pr-8 text-right">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-sm">
              {scholarships.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-20 font-bold opacity-30"
                  >
                    No Scholarships Available.
                  </td>
                </tr>
              ) : (
                scholarships.map((sch) => (
                  <tr
                    key={sch._id}
                    className="hover:bg-base-200/30 transition-colors border-b border-base-200 last:border-none"
                  >
                    <td className="py-5 pl-8">
                      <div className="flex flex-col">
                        <span className="font-black text-neutral">
                          {sch.scholarshipName}
                        </span>
                        <span className="text-xs text-primary font-bold">
                          {sch.universityName}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="text-xs font-bold">
                        {sch.universityCity},{" "}
                        <span className="opacity-60">
                          {sch.universityCountry}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col gap-1">
                        <span className="badge badge-secondary badge-sm font-bold rounded-md uppercase text-[9px]">
                          {sch.subjectCategory}
                        </span>
                        <span className="text-xs font-medium opacity-70">
                          {sch.degree}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="font-black text-error/80">
                        {new Date(sch.deadline).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                    <td className="pr-8">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => setEditingScholarship(sch)}
                          className="p-3 bg-primary/10 text-primary rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm"
                          title="Edit"
                        >
                          <CiEdit size={22} />
                        </button>
                        <button
                          onClick={() => handleDelete(sch._id)}
                          className="p-3 bg-error/10 text-error rounded-2xl hover:bg-error hover:text-white transition-all shadow-sm"
                          title="Delete"
                        >
                          <MdOutlineDeleteForever size={22} />
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

      {/* ৩. এডিট মোডাল */}
      {editingScholarship && (
        <EditScholarshipModal
          scholarship={editingScholarship}
          closeModal={() => setEditingScholarship(null)}
          onUpdate={() => {
            queryClient.invalidateQueries(["scholarships"]);
            setEditingScholarship(null);
          }}
        />
      )}
    </motion.div>
  );
};

export default ManageScholarships;
