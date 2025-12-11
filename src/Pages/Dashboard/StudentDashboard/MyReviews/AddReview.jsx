import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";

const AddReview = ({ application, closeModal }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (rating === 0 || comment.trim() === "") {
      alert("Please provide both rating and comment.");
      return;
    }

    try {
      await axiosSecure.post("/add-review", {
        rating,
        comment,
        studentEmail: user.email,
        studentName: user.displayName,
        scholarshipId: application.scholarshipId,
        scholarshipName: application.scholarshipName,
        universityName: application.universityName,
        createdAt: new Date(),
      });

      alert("Review submitted successfully!");
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    }
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
          className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4">Add Review</h2>

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
              placeholder="Write your review here..."
              className="textarea textarea-bordered w-full h-24"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-3">
            <button onClick={closeModal} className="btn btn-sm btn-neutral">
              Cancel
            </button>
            <button onClick={handleSubmit} className="btn btn-sm btn-success">
              Submit
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddReview;
