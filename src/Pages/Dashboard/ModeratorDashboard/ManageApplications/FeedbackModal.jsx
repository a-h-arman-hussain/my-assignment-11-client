import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FiMessageSquare, FiSend, FiX } from "react-icons/fi";

const FeedbackModal = ({ application, closeModal }) => {
  const axiosSecure = useAxiosSecure();
  const [feedback, setFeedback] = useState(application.feedback || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Empty Feedback",
        text: "Please write something before submitting.",
        customClass: { popup: "rounded-[2rem]" },
      });
      return;
    }

    try {
      setLoading(true);
      const res = await axiosSecure.patch(
        `/update-application/${application._id}`,
        { feedback }
      );

      if (res.data.success || res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Feedback Sent",
          text: "Student will be notified immediately.",
          timer: 1500,
          showConfirmButton: false,
          customClass: { popup: "rounded-[2rem]" },
        });
        closeModal();
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        customClass: { popup: "rounded-[2rem]" },
      });
    } finally {
      setLoading(false);
    }
  };

  console.log(application);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-neutral/40 backdrop-blur-md flex items-center justify-center z-[100] px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-base-100 p-8 rounded-[2.5rem] shadow-2xl w-full max-w-2xl relative border border-base-300"
        >
          {/* ১. ক্লোজ বাটন - এনিমেশন ও থিম সাপোর্ট সহ (হুবহু সেম) */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 p-2.5 hover:bg-error/10 text-base-content/30 hover:text-error rounded-2xl transition-all duration-300 group z-10 border border-transparent hover:border-error/20"
            title="Cancel"
          >
            <FiX
              size={24}
              className="group-hover:rotate-90 transition-transform duration-300"
            />
          </button>

          {/* ২. মোডাল হেডার সেকশন - Left Aligned Layout */}
          <div className="mb-8 border-b border-base-200 pb-6 relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-1"
            >
              {/* সাব-টাইটেল ইন্ডিকেটর */}
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                <span className="text-primary font-black tracking-[0.3em] uppercase text-[9px] md:text-[10px]">
                  Response Panel
                </span>
              </div>

              {/* মেইন টাইটেল - Standardized Typography */}
              <h2 className="text-2xl md:text-3xl font-black text-base-content uppercase tracking-tighter leading-none">
                Moderator <span className="text-primary">Feedback</span>
              </h2>

              {/* আইডি এবং রেফারেন্স লাইন */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
                <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em] md:tracking-[0.3em] flex items-center gap-2">
                  REF ID:{" "}
                  <span className="text-base-content/80 select-all font-mono">
                    {application._id.slice(-8).toUpperCase()}
                  </span>
                </p>

                {/* একটি ছোট ভিজ্যুয়াল ডিভাইডার */}
                <div className="hidden md:block w-1 h-1 rounded-full bg-base-content/20"></div>

                <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em] md:tracking-[0.3em]">
                  Student:{" "}
                  <span className="text-primary/80">
                    {application.studentName || "Applicant"}
                  </span>
                </p>
              </div>
            </motion.div>
          </div>

          {/* Feedback Input */}
          <div className="relative group">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell the student why their application status was updated..."
              className="textarea textarea-bordered w-full h-40 mb-6 bg-base-200/50 rounded-[1.5rem] border-base-300 focus:border-primary focus:ring-0 text-sm font-medium leading-relaxed resize-none p-5 transition-all"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              className="flex-1 py-4 rounded-[1.5rem] font-black uppercase text-xs tracking-widest bg-base-200 text-neutral hover:bg-base-300 transition-all active:scale-95"
              onClick={closeModal}
            >
              Discard
            </button>
            <button
              className="flex-1 py-4 rounded-[1.5rem] font-black uppercase text-xs tracking-widest bg-primary text-white hover:bg-primary-focus transition-all active:scale-95 shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                "Sending..."
              ) : (
                <>
                  <FiSend size={16} /> Submit
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FeedbackModal;
