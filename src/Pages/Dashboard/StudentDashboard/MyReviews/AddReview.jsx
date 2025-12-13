import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";

const AddReview = ({ application, closeModal }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (rating === 0 || comment.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Review",
        text: "Please provide both rating and comment.",
      });
      return;
    }

    setLoading(true);
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

      Swal.fire({
        icon: "success",
        title: "Submitted!",
        text: "Review submitted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      closeModal();
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "You have already submitted a review.",
      });
    } finally {
      setLoading(false);
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
          initial={{ scale: 0.8, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 30 }}
          transition={{ duration: 0.25 }}
          className="bg-base-100 p-6 rounded-2xl shadow-xl w-full max-w-md border border-base-300"
        >
          {/* Header */}
          <h2 className="text-2xl font-bold mb-2 text-primary text-center">
            Add Review
          </h2>
          <p className="text-sm text-gray-500 mb-4 text-center">
            Review for{" "}
            <span className="font-medium">{application.scholarshipName}</span>{" "}
            at <span className="font-medium">{application.universityName}</span>
          </p>

          {/* Rating */}
          <div className="mb-4">
            <label className="font-semibold mb-2 block">Rating:</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer text-2xl transition-colors ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  } hover:text-yellow-500`}
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
              className="textarea textarea-bordered w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-base-200 text-neutral"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-3">
            <button
              onClick={closeModal}
              className="btn btn-sm btn-outline"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className={`btn btn-sm btn-primary ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              Submit
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddReview;
