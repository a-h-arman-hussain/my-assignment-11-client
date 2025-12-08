// EditReview.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EditReview = ({ review, closeModal, onSubmit }) => {
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
          initial={{ scale: 0.8, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 30 }}
          transition={{ duration: 0.25 }}
          className="bg-black p-6 rounded-2xl shadow-2xl w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4">Edit Review</h2>

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
              className="textarea textarea-bordered w-full h-24"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-3">
            <button onClick={closeModal} className="btn btn-sm btn-neutral">
              Cancel
            </button>
            <button onClick={handleSubmit} className="btn btn-sm btn-success">
              Save
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditReview;
