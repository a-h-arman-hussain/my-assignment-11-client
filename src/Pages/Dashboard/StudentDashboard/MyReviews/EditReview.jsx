import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiStar, FiMessageSquare, FiSend } from "react-icons/fi";
import Swal from "sweetalert2";

export default function EditReview({ review, closeModal, onSubmit }) {
  const [rating, setRating] = useState(review?.rating || 0);
  const [comment, setComment] = useState(review?.comment || "");
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Missing Info",
        text: "Please provide both stars and a comment.",
        customClass: { popup: "rounded-[2rem]" },
      });
      return;
    }

    onSubmit(review._id, { rating, comment });
    closeModal();

    Swal.fire({
      icon: "success",
      title: "Review Updated!",
      showConfirmButton: false,
      timer: 1500,
      customClass: { popup: "rounded-[2rem]" },
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
        {/* Backdrop */}
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
          {/* Edit Review Modal Header */}
          <div className="bg-primary/5 p-6 md:p-8 border-b border-base-200 flex justify-between items-center relative overflow-hidden">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-1"
            >
              {/* ১. সাব-টাইটেল ইন্ডিকেটর */}
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                <span className="text-primary font-black tracking-[0.3em] uppercase text-[9px] md:text-[10px]">
                  Update Feedback
                </span>
              </div>

              {/* ২. মেইন টাইটেল - Standardized Typography */}
              <h2 className="text-2xl md:text-3xl font-black text-base-content uppercase tracking-tighter leading-none">
                Edit <span className="text-primary">Review</span>
              </h2>

              {/* ৩. ডেসক্রিপশন */}
              <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mt-2 ml-1">
                Share your updated thoughts and experience
              </p>
            </motion.div>

            {/* ৪. ইউনিফাইড ক্লোজ বাটন - (Signature Animation) */}
            <button
              onClick={closeModal}
              className="group p-3 hover:bg-error/10 text-base-content/30 hover:text-error rounded-2xl transition-all duration-300 border border-transparent hover:border-error/20"
              title="Close Modal"
            >
              <FiX
                size={24}
                className="group-hover:rotate-90 transition-transform duration-300"
              />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Star Rating Section */}
            <div className="flex flex-col items-center gap-3 py-4 bg-base-200/30 rounded-3xl border border-base-200">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral/40">
                Rate your experience
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
                      className={`transition-colors duration-200 ${
                        star <= (hoverRating || rating)
                          ? "fill-warning text-warning"
                          : "text-base-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment Section */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest ml-3 text-neutral/40 flex items-center gap-2">
                <FiMessageSquare className="text-primary" /> Your Feedback
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How was the scholarship process?"
                className="textarea w-full bg-base-200 border-none rounded-[1.5rem] text-sm font-bold text-neutral focus:ring-2 focus:ring-primary/30 outline-none transition-all h-32 py-4 px-5"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 px-6 py-4 rounded-2xl bg-base-200 text-neutral font-black uppercase text-xs tracking-widest hover:bg-base-300 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-4 rounded-2xl bg-primary text-white font-black uppercase text-xs tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <FiSend size={18} /> Update
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
