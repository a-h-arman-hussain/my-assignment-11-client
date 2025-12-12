import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const MyApplicationDetails = ({ application, closeModal }) => {
  if (!application) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className="bg-base-100 p-6 rounded-2xl shadow border border-base-300 w-full max-w-xl relative"
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute right-4 top-4 transition text-lg"
          >
            ✖
          </button>

          {/* Header */}
          <h2 className="text-2xl font-bold mb-4 text-primary text-center">
            Application Details
          </h2>

          {/* Content */}
          <div className="space-y-3 text-neutral">
            <Item label="Scholarship" value={application.scholarshipName} />
            <Item label="University" value={application.universityName} />
            <Item label="Country" value={application.universityCountry} />
            <Item
              label="Application Fees"
              value={`$${application.applicationFees}`}
            />
            <Item
              label="Payment Status"
              value={application.paymentStatus.toUpperCase()}
              highlight={application.paymentStatus === "paid"}
            />
            <Item
              label="Applied At"
              value={new Date(application.appliedAt).toLocaleString()}
            />
            {application.trackingId && (
              <Item label="Tracking ID" value={application.trackingId} />
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-end">
            <button onClick={closeModal} className="btn btn-sm btn-neutral">
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Reusable Item component
const Item = ({ label, value }) => (
  <div className="flex justify-between">
    <p className="font-semibold text-secondary">{label}:</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default MyApplicationDetails;
