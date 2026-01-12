import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiInfo,
  FiTag,
  FiGlobe,
  FiCalendar,
  FiDollarSign,
} from "react-icons/fi";

const MyApplicationDetails = ({ application, closeModal }) => {
  if (!application) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
        {/* Backdrop with blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="absolute inset-0 bg-neutral/60 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-base-100 rounded-[3rem] shadow-2xl border border-base-300 w-full max-w-2xl relative overflow-hidden"
        >
          {/* ১. ক্লোজ বাটন - গ্লোবাল ইউনিফাইড স্টাইল (Rotate on Hover) */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 p-2.5 hover:bg-error/10 text-base-content/30 hover:text-error rounded-2xl transition-all duration-300 group z-10 border border-transparent hover:border-error/20"
            title="Close Details"
          >
            <FiX
              size={24}
              className="group-hover:rotate-90 transition-transform duration-300"
            />
          </button>

          {/* ২. মোডাল হেডার সেকশন - Left Aligned Profile Layout */}
          <div className="bg-primary/5 p-8 border-b border-base-200 relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-4"
            >
              {/* আইকন বক্স - কনসিস্টেন্ট সাইজ ও শ্যাডো */}
              <div className="hidden sm:flex p-4 bg-primary text-primary-content rounded-2xl shadow-lg shadow-primary/20">
                <FiInfo size={28} />
              </div>

              <div className="space-y-1">
                {/* সাব-টাইটেল ইন্ডিকেটর */}
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                  <span className="text-primary font-black tracking-[0.3em] uppercase text-[9px] md:text-[10px]">
                    Submission Overview
                  </span>
                </div>

                {/* মেইন টাইটেল - Standardized Typography */}
                <h2 className="text-2xl md:text-3xl font-black text-base-content uppercase tracking-tighter leading-none">
                  Application <span className="text-primary">Details</span>
                </h2>

                {/* স্ট্যাটাস বা ডেসক্রিপশন লাইন */}
                <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em] md:tracking-[0.3em] mt-3">
                  View your complete scholarship submission status
                </p>
              </div>
            </motion.div>
          </div>

          {/* Details Grid */}
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailBox
                icon={<FiTag />}
                label="Scholarship"
                value={application.scholarshipName}
                className="md:col-span-2"
              />
              <DetailBox
                icon={<FiGlobe />}
                label="University"
                value={`${application.universityName}, ${application.universityCountry}`}
                className="md:col-span-2"
              />
              <DetailBox
                icon={<FiDollarSign />}
                label="Application Fees"
                value={`$${application.applicationFees}`}
              />
              <DetailBox
                icon={<FiCalendar />}
                label="Applied Date"
                value={new Date(application.appliedAt).toLocaleDateString(
                  "en-GB",
                  { day: "numeric", month: "short", year: "numeric" }
                )}
              />
            </div>

            {/* Status & ID Highlight Section */}
            <div className="flex flex-col md:flex-row gap-4 pt-4 border-t border-base-200">
              <div className="flex-1 bg-base-200/50 p-4 rounded-[1.5rem] flex flex-col items-center justify-center text-center">
                <p className="text-[10px] font-black uppercase opacity-40 mb-1">
                  Payment Status
                </p>
                <span
                  className={`font-black uppercase text-sm ${
                    application.paymentStatus === "paid"
                      ? "text-success"
                      : "text-error"
                  }`}
                >
                  {application.paymentStatus}
                </span>
              </div>
              {application.trackingId && (
                <div className="flex-1 bg-primary/10 p-4 rounded-[1.5rem] flex flex-col items-center justify-center text-center">
                  <p className="text-[10px] font-black uppercase text-primary/60 mb-1 tracking-widest">
                    Tracking ID
                  </p>
                  <span className="font-mono font-black text-primary text-sm">
                    {application.trackingId}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Close Button */}
          <div className="p-8 pt-0">
            <button
              onClick={closeModal}
              className="btn btn-neutral w-full rounded-2xl font-black uppercase tracking-widest shadow-xl"
            >
              Close Details
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// Reusable Detail Box Component
const DetailBox = ({ icon, label, value, className = "" }) => (
  <div className={`flex items-start gap-4 ${className}`}>
    <div className="mt-1 text-primary opacity-60 text-lg">{icon}</div>
    <div className="flex flex-col">
      <span className="text-[10px] font-black uppercase tracking-[0.15em] opacity-40 leading-none mb-1">
        {label}
      </span>
      <span className="font-bold text-neutral text-sm leading-tight">
        {value}
      </span>
    </div>
  </div>
);

export default MyApplicationDetails;
