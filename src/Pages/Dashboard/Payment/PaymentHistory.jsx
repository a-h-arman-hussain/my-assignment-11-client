import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiHash,
  FiCalendar,
  FiDollarSign,
  FiInbox,
} from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../Shared/Loader/Loader";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/my-applications?email=${user.email}`)
        .then((res) => {
          const paidPayments = res.data.filter(
            (app) => app.paymentStatus === "paid"
          );
          setPayments(paidPayments);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch payments:", err);
          setLoading(false);
        });
    }
  }, [user, axiosSecure]);

  if (loading) return <Loader />;

  if (!payments.length) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center opacity-30">
        <FiInbox size={64} />
        <p className="mt-4 font-black uppercase tracking-widest text-xs">
          No Payment History Found
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen p-4 md:p-8"
    >
      {/* Dashboard Page Header - Payment History */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 pb-6 border-b border-base-200">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-1"
        >
          {/* ১. সাব-টাইটেল ইন্ডিকেটর: ফিন্যান্সিয়াল ফোকাস */}
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-success/60 animate-pulse"></div>
            <span className="text-success font-black tracking-[0.3em] uppercase text-[9px] md:text-[10px]">
              Billing Records
            </span>
          </div>

          {/* ২. মেইন টাইটেল - Standardized Typography (font-black + tracking-tighter) */}
          <h1 className="text-3xl md:text-5xl font-black text-base-content uppercase tracking-tighter leading-none">
            Payment <span className="text-primary">History</span>
          </h1>

          {/* ৩. ডেসক্রিপশন: গ্লোবাল অপাসিটি এবং ট্র্যাকিং */}
          <p className="text-[10px] md:text-xs font-bold opacity-40 uppercase tracking-[0.2em] md:tracking-[0.3em] mt-3 ml-1">
            Review and track all your successful scholarship transactions
          </p>
        </motion.div>

        {/* ৪. পেমেন্ট স্ট্যাটাস সামারি (ঐচ্ছিক: ইউজারকে আশ্বস্ত করতে) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-base-200/50 px-5 py-3 rounded-[1.5rem] border border-base-300 flex items-center gap-3 self-start md:self-center group hover:border-success/30 transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center text-success">
            <FiCheckCircle className="text-sm" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60 text-base-content">
              Secure Payments
            </span>
            <span className="text-[9px] font-bold text-success/80 uppercase">
              Verified System
            </span>
          </div>
        </motion.div>
      </header>

      {/* Payment Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {payments.map((payment, index) => (
          <motion.div
            key={payment._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-base-100 rounded-[2.5rem] p-8 shadow-2xl shadow-black/5 border border-base-300 hover:border-primary/30 transition-all overflow-hidden"
          >
            {/* Status Badge Overlay */}
            <div className="absolute top-0 right-0 bg-success/10 text-success px-6 py-2 rounded-bl-[1.5rem] flex items-center gap-2">
              <FiCheckCircle size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                {payment.paymentStatus}
              </span>
            </div>

            <div className="mb-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">
                Scholarship Program
              </p>
              <h2 className="text-xl font-black text-neutral uppercase tracking-tighter leading-tight">
                {payment.scholarshipName}
              </h2>
              <p className="text-xs font-bold opacity-40 uppercase">
                {payment.universityName}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-y-6 gap-x-4 border-t border-base-200 pt-6">
              <HistoryItem
                icon={<FiDollarSign />}
                label="Amount Paid"
                value={`$${payment.applicationFees}`}
                highlight
              />
              <HistoryItem
                icon={<FiCalendar />}
                label="Date of Payment"
                value={new Date(payment.paidAt).toLocaleDateString(undefined, {
                  dateStyle: "long",
                })}
              />
              <HistoryItem
                icon={<FiHash />}
                label="Transaction ID"
                value={payment.transactionId}
                isCode
              />
              <HistoryItem
                icon={<FiHash />}
                label="Tracking ID"
                value={payment.trackingId}
                isCode
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Helper Component for Data Rows
const HistoryItem = ({ icon, label, value, highlight, isCode }) => (
  <div className="flex flex-col">
    <div className="flex items-center gap-2 opacity-40 mb-1">
      <span className="text-xs">{icon}</span>
      <p className="text-[9px] font-black uppercase tracking-widest">{label}</p>
    </div>
    <p
      className={`text-[13px] font-bold truncate ${
        highlight ? "text-primary text-lg" : "text-neutral"
      } ${isCode ? "font-mono opacity-60 text-[11px]" : ""}`}
    >
      {value}
    </p>
  </div>
);

export default PaymentHistory;
