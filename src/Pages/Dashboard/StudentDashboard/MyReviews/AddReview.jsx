import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiStar, FiMessageSquare, FiSend } from "react-icons/fi";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";

const AddReview = ({ application, closeModal }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please provide both a star rating and a comment.",
        customClass: { popup: "rounded-[2rem]" },
      });
      return;
    }

    setLoading(true);
    try {
      await axiosSecure.post("/add-review", {
        rating,
        comment,
        studentEmail: user?.email,
        studentName: user?.displayName,
        studentImage: user?.photoURL, // Ensure this matches your auth context
        scholarshipId: application.scholarshipId,
        scholarshipName: application.scholarshipName,
        universityName: application.universityName,
        createdAt: new Date(),
      });

      Swal.fire({
        icon: "success",
        title: "Thank You!",
        text: "Your review has been shared.",
        timer: 2000,
        showConfirmButton: false,
        customClass: { popup: "rounded-[2rem]" },
      });

      closeModal();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Submission Error",
        text: err.response?.data?.message || "Something went wrong.",
        customClass: { popup: "rounded-[2rem]" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
        {/* Backdrop with Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="absolute inset-0 bg-neutral/60 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-base-100 rounded-[2.5rem] shadow-2xl w-full max-w-2xl relative overflow-hidden border border-base-300"
        >
          {/* Add Review Modal Header */}
          <div className="bg-primary/5 p-6 md:p-8 border-b border-base-200 relative">
            {/* ১. ইউনিফাইড ক্লোজ বাটন (হুবহু সেইম স্টাইল) */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 p-2.5 hover:bg-error/10 text-base-content/30 hover:text-error rounded-2xl transition-all duration-300 group z-10 border border-transparent hover:border-error/20"
              title="Close Modal"
            >
              <FiX
                size={24}
                className="group-hover:rotate-90 transition-transform duration-300"
              />
            </button>

            <div className="flex justify-between items-start pr-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-1"
              >
                {/* ২. সাব-টাইটেল ইন্ডিকেটর */}
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                  <span className="text-primary font-black tracking-[0.3em] uppercase text-[9px] md:text-[10px]">
                    Share Experience
                  </span>
                </div>

                {/* ৩. মেইন টাইটেল - Standardized Typography */}
                <h2 className="text-2xl md:text-3xl font-black text-base-content uppercase tracking-tighter leading-none">
                  Add <span className="text-primary">Review</span>
                </h2>

                {/* ৪. ডাইনামিক ইনফো সেকশন */}
                <div className="mt-4 space-y-1">
                  <p className="text-[10px] font-black text-base-content opacity-60 uppercase tracking-widest truncate max-w-[280px]">
                    {application.universityName}
                  </p>
                  <p className="text-[9px] font-bold text-primary opacity-70 uppercase tracking-[0.2em] border-l-2 border-primary/30 pl-2">
                    {application.scholarshipName}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* 1. Interactive Star Rating */}
            <div className="flex flex-col items-center gap-3 py-5 bg-base-200/40 rounded-[2rem] border border-base-200">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral/40">
                How would you rate it?
              </span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="transition-transform active:scale-90"
                  >
                    <FiStar
                      size={32}
                      className={`transition-all duration-200 ${
                        star <= (hoverRating || rating)
                          ? "fill-warning text-warning drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]"
                          : "text-base-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Comment Textarea */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest ml-3 text-neutral/40 flex items-center gap-2">
                <FiMessageSquare className="text-primary" /> Share your
                experience
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What did you like or dislike?"
                className="textarea w-full bg-base-200 border-none rounded-[1.5rem] text-sm font-bold text-neutral focus:ring-2 focus:ring-primary/30 outline-none transition-all h-32 py-4 px-5 resize-none placeholder:opacity-30"
              />
            </div>

            {/* 3. Footer Buttons */}
            <div className="flex gap-4 pt-2">
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 px-6 py-4 rounded-2xl bg-base-200 text-neutral font-black uppercase text-xs tracking-widest hover:bg-base-300 transition-all"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-4 rounded-2xl bg-primary text-white font-black uppercase text-xs tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <>
                    <FiSend size={16} /> Submit
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddReview;
