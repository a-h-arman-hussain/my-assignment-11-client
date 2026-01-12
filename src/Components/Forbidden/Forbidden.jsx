import React from "react";
import Lottie from "lottie-react";
import forbiddenAnimation from "../../assets/forbidden.json";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiHome, FiGrid, FiLock } from "react-icons/fi";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-hidden p-6">
      

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 flex flex-col items-center max-w-lg w-full"
      >
        {/* Lottie Animation Container */}
        <div className="w-72 md:w-80 drop-shadow-2xl">
          <Lottie animationData={forbiddenAnimation} loop={true} />
        </div>

        {/* Text Content */}
        <div className="text-center mt-8 space-y-4">
          <div className="inline-flex items-center gap-2 bg-error/10 text-error px-4 py-1.5 rounded-full border border-error/20">
            <FiLock size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Error 403
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-neutral uppercase tracking-tighter">
            Access <span className="text-error">Forbidden</span>
          </h1>

          <p className="text-sm font-bold opacity-40 uppercase tracking-widest max-w-xs mx-auto leading-relaxed">
            Oops! You've reached a restricted area. Your current role doesn't
            have the keys to this door.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-12 w-full sm:w-auto">
          <Link
            to="/"
            className="group flex items-center justify-center gap-3 bg-neutral text-white px-8 py-4 rounded-[1.5rem] font-black uppercase text-xs tracking-widest hover:bg-primary transition-all duration-300 shadow-xl shadow-black/10 active:scale-95"
          >
            <FiHome
              size={18}
              className="group-hover:-translate-y-1 transition-transform"
            />
            Back to Home
          </Link>

          <Link
            to="/dashboard"
            className="group flex items-center justify-center gap-3 bg-base-200 text-neutral px-8 py-4 rounded-[1.5rem] font-black uppercase text-xs tracking-widest border border-base-300 hover:bg-base-300 transition-all duration-300 active:scale-95"
          >
            <FiGrid size={18} />
            Dashboard
          </Link>
        </div>
      </motion.div>

      {/* Footer Branding */}
      <div className="absolute bottom-10 text-[10px] font-black uppercase tracking-[0.5em] opacity-20">
        Secure Access Protocol | Unauthorized
      </div>
    </div>
  );
};

export default Forbidden;
