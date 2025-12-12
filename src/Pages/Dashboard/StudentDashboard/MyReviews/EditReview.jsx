// EditReview.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EditReview({ review, closeModal, onSubmit }) {
  const [rating, setRating] = useState(review?.rating || 0);
  const [comment, setComment] = useState(review?.comment || "");

  const handleSubmit = () => {
    if (rating === 0 || comment.trim() === "") {
      alert("Please provide both rating and comment.");
      return;
    }
    onSubmit(review._id, { rating, comment });
    closeModal();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.7, opacity: 0, y: 40 }}
          transition={{ duration: 0.25 }}
          className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md border border-white/20"
        >
          {/* Header */}
          <h2 className="text-3xl font-bold mb-6 text-primary text-center">
            Edit Review
          </h2>

          {/* Rating */}
          <div className="mb-4">
            <label className="font-semibold mb-2 block">Rating:</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer text-2xl ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="mb-4">
            <label className="font-semibold mb-2 block">Comment:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Update your review here..."
              className="textarea textarea-bordered w-full bg-base-100 text-neutral h-24"
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={closeModal}
              className="px-4 py-2 rounded-xl bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold shadow hover:shadow-lg transition"
            >
              Save Changes
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
