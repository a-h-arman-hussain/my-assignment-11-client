import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiBookOpen,
  FiDollarSign,
  FiCalendar,
  FiActivity,
} from "react-icons/fi";

const ApplicationDetailsModal = ({ application, closeModal }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-neutral/40 backdrop-blur-md flex items-center justify-center z-[100] px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-base-100 p-8 rounded-[3rem] shadow-2xl w-full max-w-2xl relative border border-base-300 max-h-[90vh] overflow-y-auto"
        >
          {/* ১. ক্লোজ বাটন - এনিমেশন ও থিম সাপোর্ট সহ */}
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

          {/* ২. মোডাল হেডার সেকশন */}
          <div className="mb-8 border-b border-base-200 pb-6 relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-1"
            >
              {/* সাব-টাইটেল ইন্ডিকেটর */}
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                <span className="text-primary font-black tracking-[0.3em] uppercase text-[9px] md:text-[10px]">
                  Detailed Review
                </span>
              </div>

              {/* মেইন টাইটেল - Standardized Typography */}
              <h2 className="text-2xl md:text-3xl font-black text-base-content uppercase tracking-tighter leading-none">
                Application <span className="text-primary">Profile</span>
              </h2>

              {/* আইডি এবং স্ট্যাটাস লাইন */}
              <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em] md:tracking-[0.3em] mt-3 flex items-center gap-2">
                ID:{" "}
                <span className="text-base-content/80 select-all font-mono">
                  {application._id}
                </span>
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Section 1: Student Personal Info */}
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary/60 mb-4">
                Personal Information
              </h3>

              <DetailItem
                icon={<FiUser />}
                label="Student Name"
                value={application.studentName}
              />
              <DetailItem
                icon={<FiMail />}
                label="Email Address"
                value={application.studentEmail}
              />
              <DetailItem
                icon={<FiPhone />}
                label="Phone Number"
                value={application.phone}
              />
              <DetailItem
                icon={<FiMapPin />}
                label="Mailing Address"
                value={application.address}
              />
              <DetailItem
                icon={<FiBookOpen />}
                label="Previous Education"
                value={application.previousEducation}
              />
            </div>

            {/* Section 2: Scholarship & Status */}
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary/60 mb-4">
                Scholarship Context
              </h3>

              <div className="p-4 bg-primary/5 rounded-[1.5rem] border border-primary/10">
                <DetailItem
                  icon={<FiActivity />}
                  label="University"
                  value={application.universityName}
                />
                <div className="mt-4">
                  <DetailItem
                    icon={<FiActivity />}
                    label="Applied Program"
                    value={application.scholarshipName}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <DetailItem
                  icon={<FiDollarSign />}
                  label="App Fees"
                  value={`$${application.applicationFees}`}
                />
                <DetailItem
                  icon={<FiCalendar />}
                  label="Applied Date"
                  value={new Date(application.appliedAt).toLocaleDateString()}
                />
              </div>

              <div className="space-y-4 pt-4">
                <StatusRow
                  label="Application Status"
                  value={application.applicationStatus}
                />
                <StatusRow
                  label="Payment Status"
                  value={application.paymentStatus}
                />
              </div>
            </div>
          </div>

          {/* Feedback Section */}
          <div className="mt-8 p-6 bg-base-200/50 rounded-[2rem] border border-base-200">
            <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">
              Admin Feedback
            </h4>
            <p className="text-sm font-bold text-neutral italic">
              {application.feedback
                ? `"${application.feedback}"`
                : "No feedback has been recorded for this application yet."}
            </p>
          </div>

          {/* Action Button */}
          <div className="mt-10">
            <button
              className="w-full py-4 bg-neutral text-white rounded-[1.5rem] font-black uppercase text-xs tracking-[0.2em] hover:bg-primary transition-all active:scale-[0.98]"
              onClick={closeModal}
            >
              Close Profile
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Internal Helper Components
const DetailItem = ({ icon, label, value }) => (
  <div className="flex gap-4">
    <div className="mt-1 text-primary opacity-60">{icon}</div>
    <div>
      <p className="text-[9px] font-black uppercase tracking-widest opacity-40 leading-none mb-1">
        {label}
      </p>
      <p className="text-sm font-bold text-neutral leading-tight">
        {value || "Not Provided"}
      </p>
    </div>
  </div>
);

const StatusRow = ({ label, value }) => {
  const getStatusColor = (val) => {
    if (val === "completed" || val === "paid")
      return "bg-success/10 text-success";
    if (val === "pending") return "bg-warning/10 text-warning";
    if (val === "rejected") return "bg-error/10 text-error";
    return "bg-primary/10 text-primary";
  };

  return (
    <div className="flex items-center justify-between bg-base-100 p-3 rounded-2xl border border-base-200">
      <span className="text-[9px] font-black uppercase tracking-widest opacity-40">
        {label}
      </span>
      <span
        className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${getStatusColor(
          value
        )}`}
      >
        {value}
      </span>
    </div>
  );
};

export default ApplicationDetailsModal;
