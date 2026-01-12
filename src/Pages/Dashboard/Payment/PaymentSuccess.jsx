import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router";
import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiArrowRight,
  FiDownload,
  FiHash,
} from "react-icons/fi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../Shared/Loader/Loader";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const applicationId = searchParams.get("applicationId");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId && applicationId) {
      axiosSecure
        .patch(`/payments/complete/${applicationId}`, { sessionId })
        .then((res) => {
          setPaymentData(res.data);
          setLoading(false);
          // অটো-রিডাইরেক্ট ৫ সেকেন্ড পর
          const timer = setTimeout(
            () => navigate("/dashboard/my-applications"),
            6000
          );
          return () => clearTimeout(timer);
        })
        .catch((err) => {
          console.error("Payment error:", err);
          setLoading(false);
        });
    }
  }, [sessionId, applicationId, axiosSecure, navigate]);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full"
      >
        <div className="bg-base-100 rounded-[3rem] shadow-2xl shadow-black/5 border border-base-300 overflow-hidden relative">
          {/* Top Banner */}
          <div className="bg-success h-3 w-full" />

          <div className="p-8 md:p-12 text-center">
            {/* Payment Success Header Section */}
            <div className="flex flex-col items-center text-center">
              {/* ১. সাকসেস ইন্ডিকেটর এনিমেশন */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-20 h-20 bg-success/10 rounded-[2.5rem] flex items-center justify-center text-success mb-8 shadow-inner border border-success/20"
              >
                <FiCheckCircle size={40} className="animate-pulse" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* ২. মেইন টাইটেল - Standardized Typography (font-black + tracking-tighter) */}
                <h1 className="text-xl md:text-3xl font-black text-base-content uppercase tracking-tighter leading-none mb-4">
                  Payment <span className="text-success">Confirmed</span>
                </h1>

                {/* ৩. সাব-টাইটেল: মোটিভেশনাল ট্র্যাকিং */}
                <div className="flex items-center justify-center gap-3 mb-10">
                  <div className="hidden md:block w-8 h-[1px] bg-base-content/10"></div>
                  <p className="text-[10px] md:text-xs font-black opacity-40 uppercase tracking-[0.3em] ml-1">
                    Your scholarship journey begins here
                  </p>
                  <div className="hidden md:block w-8 h-[1px] bg-base-content/10"></div>
                </div>
              </motion.div>
            </div>

            {/* Receipt Card */}
            {paymentData && (
              <div className="bg-base-200/50 rounded-[2rem] p-6 text-left space-y-4 border border-base-300">
                <div className="flex justify-between items-start border-b border-base-300 pb-4 mb-4">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-40">
                      Scholarship
                    </p>
                    <h3 className="font-bold text-neutral">
                      {paymentData.scholarshipName}
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-40">
                      Amount
                    </p>
                    <h3 className="font-black text-primary text-xl">
                      ${paymentData.applicationFees}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <InfoBlock label="Student" value={paymentData.studentName} />
                  <InfoBlock
                    label="University"
                    value={paymentData.universityName}
                  />
                  <InfoBlock
                    label="Transaction ID"
                    value={paymentData.transactionId}
                    isMono
                  />
                  <InfoBlock
                    label="Tracking ID"
                    value={paymentData.trackingId}
                    isMono
                  />
                </div>
              </div>
            )}

            {/* Redirect Timer Animation */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-ping" />
              <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest">
                Redirecting to applications in a few seconds...
              </p>
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                to="/dashboard/my-applications"
                className="flex-1 bg-neutral text-white py-4 rounded-[1.5rem] font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-primary transition-all active:scale-95"
              >
                Go to Dashboard <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Internal Helper
const InfoBlock = ({ label, value, isMono }) => (
  <div>
    <p className="text-[8px] font-black uppercase tracking-[0.2em] opacity-40 mb-1">
      {label}
    </p>
    <p
      className={`text-xs font-bold text-neutral truncate ${
        isMono ? "font-mono opacity-60" : ""
      }`}
    >
      {value}
    </p>
  </div>
);

export default PaymentSuccess;
