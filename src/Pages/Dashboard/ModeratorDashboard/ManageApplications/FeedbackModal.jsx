import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const FeedbackModal = ({ application, closeModal, onSubmit }) => {
  const axiosSecure = useAxiosSecure();
  const [feedback, setFeedback] = useState(application.feedback || "");

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      alert("Feedback cannot be empty");
      return;
    }

    try {
      const res = await axiosSecure.patch(
        `/update-application/${application._id}`,
        { feedback }
      );
      if (res.data.success) {
        alert("Feedback submitted successfully!");
        closeModal();
      } else {
        alert("Failed to submit feedback");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit feedback");
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
          <h2 className="text-2xl font-bold mb-4">Write Feedback</h2>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write feedback here..."
            className="textarea textarea-bordered w-full h-32 mb-4"
          />
          <div className="flex justify-end gap-2">
            <button className="btn btn-sm btn-neutral" onClick={closeModal}>
              Cancel
            </button>
            <button className="btn btn-sm btn-success" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FeedbackModal;
