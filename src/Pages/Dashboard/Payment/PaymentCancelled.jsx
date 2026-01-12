import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiXCircle, FiArrowLeft, FiHome, FiAlertCircle } from "react-icons/fi";

const PaymentCancelled = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-base-100 shadow-2xl shadow-error/5 rounded-[3rem] p-10 max-w-md w-full text-center border border-error/10 relative overflow-hidden"
      >
        {/* Background Decorative Gradient */}
        <div className="absolute top-0 left-0 w-full h-2 bg-error opacity-20" />

        {/* Payment Cancelled Header Section */}
        <div className="flex flex-col items-center text-center">
          {/* ১. এরর ইন্ডিকেটর - Unified Style */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-error/10 rounded-[2.5rem] flex items-center justify-center text-error mb-8 shadow-inner border border-error/20"
          >
            <FiAlertCircle size={40} className="animate-pulse" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {/* ২. মেইন টাইটেল - Standardized Typography */}
            <h1 className="text-xl md:text-3xl font-black text-base-content uppercase tracking-tighter leading-none mb-4">
              Payment <span className="text-error">Cancelled</span>
            </h1>

            {/* ৩. সাব-টাইটেল ও অ্যাসিউরেন্স মেসেজ */}
            <div className="max-w-md mx-auto">
              <p className="text-[10px] md:text-xs font-black opacity-40 uppercase tracking-[0.2em] md:tracking-[0.3em] leading-relaxed mb-10">
                The transaction was not completed.{" "}
                <br className="hidden md:block" />
                <span className="text-error/60">
                  No funds were deducted
                </span>{" "}
                from your account.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <Link
            to="/dashboard/my-applications"
            className="group flex items-center justify-center gap-3 bg-neutral text-white px-8 py-5 rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.2em] hover:bg-error transition-all duration-300 shadow-xl shadow-black/10 active:scale-95"
          >
            <FiArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Return to Applications
          </Link>

          <Link
            to="/"
            className="flex items-center justify-center gap-3 bg-base-200 text-neutral px-8 py-5 rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.2em] hover:bg-base-300 transition-all active:scale-95"
          >
            <FiHome size={18} />
            Go to Home
          </Link>
        </div>

        {/* Support Text */}
        <p className="mt-8 text-[9px] font-black uppercase tracking-widest opacity-20">
          Need help? Contact our scholarship support team.
        </p>
      </motion.div>
    </div>
  );
};

export default PaymentCancelled;
