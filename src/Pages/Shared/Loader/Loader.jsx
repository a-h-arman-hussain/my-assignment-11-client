import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-center space-y-6">
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Ring */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-24 h-24 bg-primary rounded-[2rem] blur-xl"
        />

        {/* Inner Spinning Ring */}
        <div className="relative">
          <div className="w-16 h-16 border-[6px] border-primary/10 border-t-primary rounded-[1.5rem] animate-spin"></div>

          {/* Center Dot */}
          <motion.div
            animate={{ scale: [1, 0.8, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-warning rounded-full shadow-[0_0_10px_rgba(250,204,21,0.8)]"
          />
        </div>
      </div>

      {/* Loading Text */}
      <div className="text-center">
        <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-neutral opacity-40 animate-pulse">
          Loading <span className="text-primary">....</span>
        </h3>
      </div>
    </div>
  );
};

export default Loader;
