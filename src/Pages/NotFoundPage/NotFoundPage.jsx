import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiHome, FiAlertCircle } from "react-icons/fi";

const NotFoundPage = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-base-100 overflow-hidden px-6">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[15%] w-72 h-72 bg-primary/10 rounded-[4rem] blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 60, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        />
      </div>

      <div className="z-10 text-center flex flex-col items-center">
        {/* Animated Error Icon - FIXED ERROR HERE */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, 15, -15, 0] }} // Keyframes
          transition={{
            duration: 0.8,
            ease: "backOut", // Spring এর বদলে backOut ব্যবহার করা হয়েছে keyframes সাপোর্ট করার জন্য
            delay: 0.2,
          }}
          className="bg-primary/5 p-6 mt-2 rounded-[2.5rem] text-primary border border-primary/10"
        >
          <FiAlertCircle size={80} />
        </motion.div>

        {/* 404 Text */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-[8rem] font-black text-neutral leading-none tracking-tighter"
        >
          4<span className="text-primary">0</span>4
        </motion.h1>

        {/* Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-4"
        >
          <h2 className="text-3xl md:text-5xl font-black text-neutral uppercase tracking-tighter">
            Lost in <span className="text-primary">Space?</span>
          </h2>
          <p className="text-sm font-bold opacity-40 uppercase tracking-[0.3em] mt-3 max-w-lg mx-auto leading-relaxed">
            The page you are looking for has vanished into thin air or moved to
            a new galaxy.
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <Link
            to="/"
            className="group flex items-center gap-3 bg-neutral text-white px-10 py-5 rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-2xl hover:bg-primary transition-all duration-300 hover:scale-105 active:scale-95 shadow-primary/20"
          >
            <FiHome
              size={20}
              className="group-hover:-translate-y-1 transition-transform"
            />
            Back to Home
          </Link>
        </motion.div>
      </div>

      {/* Footer Branding */}
      <div className="bottom-10 text-[10px] font-black uppercase tracking-[0.5em] opacity-20 mt-3">
        Scholarship Portal | Error 404
      </div>
    </div>
  );
};

export default NotFoundPage;
