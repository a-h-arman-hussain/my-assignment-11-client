import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { FiLogIn } from "react-icons/fi";
import logo from "../../../assets/Screenshot_2025-12-13_191151-removebg-preview.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  const links = [
    { to: "/", label: "Home" },
    { to: "/all-scholarships", label: "All Scholarships" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact Us" },
  ];

  // Sticky navbar shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <motion.nav
      animate={{
        boxShadow: scrolled
          ? "0 4px 20px rgba(0, 0, 0, 0.08)"
          : "0 0 0 rgba(0, 0, 0, 0)",
        paddingTop: scrolled ? "0.25rem" : "0.5rem",
        paddingBottom: scrolled ? "0.25rem" : "0.5rem",
      }}
    >
      <div className="flex justify-between items-center h-12 px-[5%]">
        {/* Logo */}
        <button
          className="lg:hidden btn-ghost text-primary cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
        <Link to="/">
          <img src={logo} alt="" className="w-40 h-12" />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex gap-6 font-medium">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `transition-colors ${
                    isActive
                      ? "text-primary font-semibold border-b-2 border-primary"
                      : "hover:text-primary"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="relative flex items-center" ref={dropdownRef}>
          {user ? (
            <>
              {/* Avatar Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary shadow-lg focus:outline-none transition-all cursor-pointer"
              >
                <img
                  src={user.photoURL || "https://i.ibb.co/4pDNd9p/avatar.png"}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </motion.button>

              {/* Ultra-modern Glass Dropdown */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="absolute right-1 mt-44 w-44 bg-base-200/70 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl py-2 z-50 overflow-hidden"
                  >
                    {/* Optional Arrow */}
                    <div className="absolute -top-2 right-4 w-3 h-3 bg-white/20 rotate-45 border-l border-t border-white/30"></div>

                    <ul className="flex flex-col gap-1">
                      <li className="px-4 py-2 hover:bg-white/30 rounded-lg transition font-medium text-gray-900 cursor-pointer">
                        <Link to="/dashboard" className="w-full block">
                          Dashboard
                        </Link>
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-red-500/30 rounded-lg cursor-pointer text-red-600 font-medium transition"
                        onClick={logOut}
                      >
                        Logout
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              }}
              className="rounded-full"
            >
              <Link
                to="/login"
                className="btn bg-primary text-white font-semibold rounded-full px-5 lg:px-6 py-2 lg:py-2.5 shadow-md transition-all"
              >
                <FiLogIn />
                Login
              </Link>
            </motion.div>
          )}
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-14 left-0 w-full bg-base-200 shadow-md border-t border-base-300 flex flex-col lg:hidden"
            >
              {links.map((link) => (
                <li key={link.to} className="border-b border-base-300">
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `block w-full px-6 py-3 transition-colors ${
                        isActive
                          ? "text-primary font-semibold border-b-2 border-primary"
                          : "hover:text-primary"
                      }`
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
