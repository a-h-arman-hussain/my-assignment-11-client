import React, { useEffect, useState } from "react";
import Navbar from "../../Pages/Shared/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../../Pages/Shared/Footer/Footer";
import { motion, AnimatePresence } from "framer-motion";

const MainLayout = () => {
  const [scrolled, setScrolled] = useState(false);

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-base-200 text-base-content min-h-screen flex flex-col font-sans selection:bg-primary/30 selection:text-primary-content">
      {/* ১. স্টিকি হেডার উইথ গ্লাস-মরফিজম (Global Rule: Shadow & Backdrop Blur) */}
      <header
        className={`sticky top-0 z-50 bg-base-200/60 backdrop-blur-2xl border-b border-base-300 shadow-sm transition-all duration-300 ${
          scrolled
            ? "bg-base-100/80 backdrop-blur-md shadow-lg py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Navbar />
        </div>
      </header>

      {/* ২. মেইন কন্টেন্ট সেকশন (Global Rule: Consistent Spacing & Animations) */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-6">
        <AnimatePresence mode="wait">
          {/* পেজ ট্রানজিশন এনিমেশন */}
          <motion.div
            key={window.location.pathname} // পাথ পরিবর্তন হলে এনিমেশন ট্রিগার হবে
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ৩. ফুটার (Global Rule: Border & Alignment) */}
      <footer className="bg-base-100/50 border-t border-base-300 mt-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Footer />
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
