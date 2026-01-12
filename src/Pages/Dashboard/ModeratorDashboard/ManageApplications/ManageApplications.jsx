import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loader from "../../../Shared/Loader/Loader";
import ApplicationDetailsModal from "./ApplicationDetailsModal";
import FeedbackModal from "./FeedbackModal";
import { IoInformationCircleSharp } from "react-icons/io5";
import { MdCancel, MdFeedback } from "react-icons/md";
import Swal from "sweetalert2";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedApp, setSelectedApp] = useState(null);
  const [feedbackApp, setFeedbackApp] = useState(null);

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["allApplications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/applications/${id}`, {
        status: newStatus,
      });
      Swal.fire({
        icon: "success",
        title: "Status Updated!",
        text: `Status is now ${newStatus}`,
        timer: 1200,
        showConfirmButton: false,
        customClass: { popup: "rounded-[2rem]" },
      });
      queryClient.invalidateQueries(["allApplications"]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Reject Application?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      confirmButtonText: "Yes, Reject",
      customClass: { popup: "rounded-[2rem]" },
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.patch(`/applications/${id}`, {
        applicationStatus: "rejected",
      });
      queryClient.invalidateQueries(["allApplications"]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-base-200/50 min-h-screen p-4 md:p-8"
    >
      {/* Header Section */}
      {/* Dashboard Page Header - Manage Applications */}
      <header className="mb-12 pb-6 border-b border-base-200">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-1"
        >
          {/* ১. সাব-টাইটেল ইন্ডিকেটর: প্রসেসিং স্ট্যাটাস বোঝাতে */}
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse"></div>
            <span className="text-primary font-black tracking-[0.3em] uppercase text-[10px]">
              Application Pipeline
            </span>
          </div>

          {/* ২. মেইন টাইটেল: Standardized Typography (font-black + tracking-tighter) */}
          <h1 className="text-3xl md:text-5xl font-black text-base-content uppercase tracking-tighter leading-none">
            Manage <span className="text-primary">Applications</span>
          </h1>

          {/* ৩. ডেসক্রিপশন: প্রফেশনাল অপাসিটি এবং ট্র্যাকিং */}
          <p className="text-[10px] md:text-xs font-bold opacity-40 uppercase tracking-[0.2em] md:tracking-[0.3em] mt-3 ml-1">
            Review, Process, and manage scholarship requests in real-time
          </p>
        </motion.div>
      </header>

      {/* Main Table Container */}
      <div className="bg-base-100 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-base-300 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-base-200/60">
                <th className="p-6 text-[10px] font-black uppercase tracking-widest opacity-60">
                  Applicant
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest opacity-60">
                  University
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest opacity-60">
                  Feedback
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest opacity-60">
                  Payment Status
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest opacity-60 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr
                  key={app._id}
                  className="hover:bg-base-200/30 transition-colors"
                >
                  <td className="p-6 border-b border-base-200">
                    <p className="font-black text-sm text-neutral">
                      {app.studentName}
                    </p>
                    <p className="text-[10px] font-bold opacity-40 tracking-tight">
                      {app.studentEmail}
                    </p>
                  </td>
                  <td className="p-6 border-b border-base-200">
                    <p className="text-xs font-bold text-neutral uppercase tracking-tighter">
                      {app.universityName}
                    </p>
                  </td>
                  <td className="p-6 border-b border-base-200">
                    <p className="text-[11px] font-medium italic opacity-60 truncate max-w-[150px]">
                      {app.feedback || "---"}
                    </p>
                  </td>
                  <td className="p-6 border-b border-base-200">
                    <StatusBadge status={app.paymentStatus} />
                  </td>
                  <td className="p-6 border-b border-base-200">
                    <div className="flex items-center justify-center gap-2">
                      <ActionButton
                        icon={<IoInformationCircleSharp size={18} />}
                        color="bg-info"
                        onClick={() => setSelectedApp(app)}
                      />
                      <ActionButton
                        icon={<MdFeedback size={18} />}
                        color="bg-primary"
                        onClick={() => setFeedbackApp(app)}
                      />

                      <select
                        value={app.applicationStatus}
                        onChange={(e) =>
                          handleStatusUpdate(app._id, e.target.value)
                        }
                        className="select select-xs select-bordered rounded-xl font-black text-[10px] uppercase bg-base-100"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                      </select>

                      <ActionButton
                        icon={<MdCancel size={18} />}
                        color="bg-error"
                        onClick={() => handleCancel(app._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals remain same as they use your custom logic */}
      {selectedApp && (
        <ApplicationDetailsModal
          application={selectedApp}
          closeModal={() => setSelectedApp(null)}
        />
      )}
      {feedbackApp && (
        <FeedbackModal
          application={feedbackApp}
          closeModal={() => setFeedbackApp(null)}
        />
      )}
    </motion.div>
  );
};

// Internal Small Components
const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-warning/10 text-warning",
    processing: "bg-info/10 text-info",
    completed: "bg-success/10 text-success",
    rejected: "bg-error/10 text-error",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${
        styles[status] || "bg-base-200"
      }`}
    >
      {status}
    </span>
  );
};

const ActionButton = ({ icon, color, onClick }) => (
  <button
    onClick={onClick}
    className={`${color} text-white p-2 rounded-xl hover:scale-110 active:scale-95 transition-all shadow-lg shadow-black/5`}
  >
    {icon}
  </button>
);

export default ManageApplications;
