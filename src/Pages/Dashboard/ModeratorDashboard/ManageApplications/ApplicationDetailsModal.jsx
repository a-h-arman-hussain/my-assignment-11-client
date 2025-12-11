import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ApplicationDetailsModal = ({ application, closeModal }) => {
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
          className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Application Details</h2>
          <div className="space-y-2">
            <p>
              <strong>Student Name:</strong> {application.studentName}
            </p>
            <p>
              <strong>Email:</strong> {application.studentEmail}
            </p>
            <p>
              <strong>Phone:</strong> {application.phone}
            </p>
            <p>
              <strong>Address:</strong> {application.address}
            </p>
            <p>
              <strong>Previous Education:</strong>{" "}
              {application.previousEducation}
            </p>
            <p>
              <strong>University:</strong> {application.universityName}
            </p>
            <p>
              <strong>Scholarship:</strong> {application.scholarshipName}
            </p>
            <p>
              <strong>Fees:</strong> ${application.applicationFees}
            </p>
            <p>
              <strong>Payment Status:</strong> {application.paymentStatus}
            </p>
            <p>
              <strong>Application Status:</strong>{" "}
              {application.applicationStatus}
            </p>
            <p>
              <strong>Applied At:</strong>{" "}
              {new Date(application.appliedAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Feedback:</strong>{" "}
              {application.feedback || "No feedback yet"}
            </p>
          </div>
          <div className="flex justify-end mt-4">
            <button className="btn btn-sm btn-outline" onClick={closeModal}>
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ApplicationDetailsModal;
