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
        {/* Modal Box */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.7, opacity: 0, y: 40 }}
          transition={{ duration: 0.25 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-xl p-6 relative border border-white/20"
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute right-3 top-3 text-xl text-gray-600 hover:text-red-500 transition"
          >
            ✖
          </button>

          {/* Header */}
          <div className="mb-5">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
              Application Summary
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              All details at a glance
            </p>
          </div>

          {/* Content */}
          <div className="space-y-4 text-gray-700">
            <Item label="Scholarship" value={application.scholarshipName} />
            <Item label="University" value={application.universityName} />
            <Item label="Country" value={application.universityCountry} />
            <Item
              label="Application Fees"
              value={`$${application.applicationFees}`}
            />

            <div className="flex justify-between">
              <p className="font-semibold">Payment Status:</p>
              <span
                className={`font-bold ${
                  application.paymentStatus === "paid"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {application.paymentStatus.toUpperCase()}
              </span>
            </div>

            <Item
              label="Applied At"
              value={new Date(application.appliedAt).toLocaleString()}
            />

            {application.trackingId && (
              <Item
                label="Tracking ID"
                value={application.trackingId}
                highlight
              />
            )}
          </div>

          {/* Footer Button */}
          <div className="mt-6 text-right">
            <button
              onClick={closeModal}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-md hover:shadow-lg transition"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Reusable Item Component
const Item = ({ label, value, highlight }) => (
  <div className="flex justify-between">
    <p className="font-semibold">{label}:</p>
    <p
      className={`font-medium ${
        highlight ? "text-purple-600" : "text-gray-800"
      }`}
    >
      {value}
    </p>
  </div>
);

export default MyApplicationDetails;
