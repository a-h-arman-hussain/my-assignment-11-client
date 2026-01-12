import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Loader from "../../../Shared/Loader/Loader";
import MyApplicationDetails from "./MyApplicationDetails";
import EditMyApplication from "./EditMyApplication";
import AddReview from "../MyReviews/AddReview";
import { IoInformationCircleSharp } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import {
  MdOutlineDeleteForever,
  MdOutlinePayment,
  MdPreview,
} from "react-icons/md";
import Swal from "sweetalert2";

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedApp, setSelectedApp] = useState(null);
  const [updatingApp, setUpdatingApp] = useState(null);
  const [reviewingApp, setReviewingApp] = useState(null);

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["myApplications", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/my-applications?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
  console.log(applications);
  const handleUpdate = async (id, data) => {
    try {
      await axiosSecure.patch(`/update-application/${id}`, data);
      Swal.fire({
        icon: "success",
        title: "Updated!",
        showConfirmButton: false,
        timer: 1500,
        customClass: { popup: "rounded-[2rem]" },
      });
      queryClient.invalidateQueries(["myApplications", user?.email]);
      setUpdatingApp(null);
    } catch (err) {
      Swal.fire({ icon: "error", title: "Update Failed" });
    }
  };

  const handlePayment = async (app) => {
    try {
      const paymentPayload = {
        applicationId: app._id,
        scholarshipId: app.scholarshipId,
        scholarshipName: app.scholarshipName,
        universityName: app.universityName,
        amount: Number(app.applicationFees),
        userEmail: app.userEmail,
        studentEmail: app.studentEmail,
        studentName: app.studentName,
      };
      const res = await axiosSecure.post("/payments/init", paymentPayload);
      window.location.assign(res.data.url);
    } catch (err) {
      alert("Payment failed. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Application?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--color-error, #f87272)",
      confirmButtonText: "Yes, Delete",
      customClass: { popup: "rounded-[2rem]" },
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/delete-application/${id}`);
        queryClient.invalidateQueries(["myApplications", user?.email]);
      } catch (err) {
        Swal.fire({ icon: "error", title: "Failed to delete" });
      }
    }
  };

  if (isLoading) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10 pb-10"
    >
      {/* User Dashboard Header - My Applications */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 pb-6 border-b border-base-200">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-1"
        >
          {/* ১. সাব-টাইটেল ইন্ডিকেটর: স্টুডেন্ট পোর্টাল স্টাইল */}
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
            <span className="text-primary font-black tracking-[0.3em] uppercase text-[9px] md:text-[10px]">
              Student Portal
            </span>
          </div>

          {/* ২. মেইন টাইটেল - Standardized Typography (font-black + tracking-tighter) */}
          <h1 className="text-3xl md:text-5xl font-black text-base-content uppercase tracking-tighter leading-none">
            My <span className="text-primary">Applications</span>
          </h1>

          {/* ৩. ডেসক্রিপশন: গ্লোবাল অপাসিটি এবং ট্র্যাকিং */}
          <p className="text-[10px] md:text-xs font-bold opacity-40 uppercase tracking-[0.2em] md:tracking-[0.3em] mt-3 ml-1">
            Track, update, and manage your scholarship journey in real-time
          </p>
        </motion.div>

        {/* ৪. ডাইনামিক কাউন্টার (ইউজারের জন্য মোটিভেশনাল) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-base-200/50 px-5 py-3 rounded-[1.5rem] border border-base-300 flex items-center gap-3 self-start md:self-center"
        >
          <div className="flex -space-x-2">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <div className="w-2 h-2 rounded-full bg-primary/40 animate-ping"></div>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest opacity-60 text-base-content">
            Current Stats: {applications.length} Applied
          </span>
        </motion.div>
      </header>

      {/* ২. অ্যাপ্লিকেশন টেবিল কন্টেইনার */}
      <div className="bg-base-100 rounded-[2.5rem] border border-base-300 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200/50 border-none">
              <tr className="text-neutral/40 uppercase text-[10px] tracking-widest border-none">
                <th className="py-6 pl-8">University & Category</th>
                <th>Feedback</th>
                <th>Fees</th>
                <th>Status</th>
                <th className="pr-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {applications.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-20 opacity-30 font-bold"
                  >
                    No applications yet.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr
                    key={app._id}
                    className="border-b border-base-200 last:border-none hover:bg-base-200/20 transition-colors"
                  >
                    <td className="py-5 pl-8">
                      <div className="flex flex-col">
                        <span className="font-black text-neutral leading-tight">
                          {app.universityName}
                        </span>
                        <span className="text-[10px] font-bold text-primary uppercase mt-1">
                          {app.subjectCategory}
                        </span>
                      </div>
                    </td>
                    <td>
                      <p className="text-xs italic opacity-60 truncate max-w-[150px]">
                        {app.feedback || "No feedback yet"}
                      </p>
                    </td>
                    <td>
                      <span className="font-black text-neutral">
                        ${app.applicationFees}
                      </span>
                    </td>
                    <td>
                      <StatusBadge status={app.applicationStatus} />
                    </td>
                    <td className="pr-8 text-right">
                      <div className="flex justify-end gap-2 flex-wrap">
                        {/* Details */}
                        <ActionButton
                          onClick={() => setSelectedApp(app)}
                          icon={<IoInformationCircleSharp size={18} />}
                          color="bg-info/10 text-info"
                          label="Details"
                        />

                        {/* Edit (Only if Pending) */}
                        {app.applicationStatus === "pending" && (
                          <ActionButton
                            onClick={() => setUpdatingApp(app)}
                            icon={<CiEdit size={18} />}
                            color="bg-warning/10 text-warning"
                            label="Edit"
                          />
                        )}

                        {/* Pay (If not paid) */}
                        {app.paymentStatus !== "paid" && (
                          <ActionButton
                            onClick={() => handlePayment(app)}
                            icon={<MdOutlinePayment size={18} />}
                            color="bg-success/10 text-success"
                            label="Pay"
                          />
                        )}

                        {/* Delete (Only if Pending) */}
                        {app.applicationStatus === "pending" && (
                          <ActionButton
                            onClick={() => handleDelete(app._id)}
                            icon={<MdOutlineDeleteForever size={18} />}
                            color="bg-error/10 text-error"
                            label="Cancel"
                          />
                        )}

                        {/* Review (Only if Completed) */}
                        {app.applicationStatus === "completed" && (
                          <ActionButton
                            onClick={() => setReviewingApp(app)}
                            icon={<MdPreview size={18} />}
                            color="bg-primary/10 text-primary"
                            label="Review"
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ৩. মোডাল কন্টেইনারস */}
      {selectedApp && (
        <MyApplicationDetails
          application={selectedApp}
          closeModal={() => setSelectedApp(null)}
        />
      )}
      {updatingApp && (
        <EditMyApplication
          application={updatingApp}
          closeModal={() => setUpdatingApp(null)}
          onUpdate={handleUpdate}
        />
      )}
      {reviewingApp && (
        <AddReview
          application={reviewingApp}
          closeModal={() => setReviewingApp(null)}
        />
      )}
    </motion.div>
  );
};

// হেল্পার সাব-কম্পোনেন্টস
const ActionButton = ({ onClick, icon, color, label }) => (
  <button
    onClick={onClick}
    className={`p-2.5 ${color} rounded-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-1 font-bold text-[10px] uppercase shadow-sm`}
    title={label}
  >
    {icon}
  </button>
);

const StatusBadge = ({ status }) => {
  const styles = {
    completed: "bg-success/10 text-success",
    pending: "bg-warning/10 text-warning",
    processing: "bg-info/10 text-info",
    rejected: "bg-error/10 text-error",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-wider ${
        styles[status] || "bg-base-200 opacity-50 text-neutral"
      }`}
    >
      {status}
    </span>
  );
};

export default MyApplications;
