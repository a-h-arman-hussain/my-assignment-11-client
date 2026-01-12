import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { FiLogIn, FiLogOut, FiMoon, FiSun, FiMenu, FiX } from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import logo from "../../../assets/Screenshot_2025-12-13_191151-removebg-preview.png";
import { MdContactMail, MdDashboard, MdHome } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Navbar = () => {
  const { user: firebaseUser, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const dropdownRef = useRef(null);

  // Links Configuration
  const links = [
    { to: "/", label: "Home", icon: <MdHome size={20} /> },
    {
      to: "/all-scholarships",
      label: "All Scholarships",
      icon: <FaGraduationCap size={20} />,
    },
    { to: "/about", label: "About", icon: <AiOutlineInfoCircle size={20} /> },
    { to: "/contact", label: "Contact", icon: <MdContactMail size={20} /> },
  ];

  // Theme Toggle Logic
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Click Outside to Close Dropdown
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Fetch User Data
  const { data: userData } = useQuery({
    queryKey: ["user", firebaseUser?.email],
    queryFn: async () => {
      if (!firebaseUser?.email) return null;
      const res = await axiosSecure.get(`/users/${firebaseUser.email}`);
      return res.data;
    },
    enabled: !!firebaseUser?.email,
  });

  const handleLogout = () => {
    logOut();
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full z-50 transition-all duration-300`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2">
          {/* লোগো ইমেজের সাইজ ঠিক করা হয়েছে */}
          <img
            src={logo}
            alt="Logo"
            className="w-auto h-10 lg:h-12 object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-6 xl:gap-8 font-medium text-base-content">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "text-primary bg-primary/10 font-semibold"
                      : "hover:text-primary hover:bg-base-200"
                  }`
                }
              >
                {/* আইকনগুলো শুধু হোভার বা অ্যাক্টিভ অবস্থায় দেখাতে পারেন যদি ক্লিন লুক চান, 
                    তবে রিকোয়ারমেন্ট অনুযায়ী আইকন রাখা হয়েছে */}
                <span className="text-lg">{link.icon}</span>
                <span>{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Actions Section */}
        <div className="flex items-center gap-3 lg:gap-4" ref={dropdownRef}>
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-circle btn-ghost btn-sm text-xl transition-transform hover:rotate-180"
            title="Toggle Theme"
          >
            {theme === "light" ? (
              <FiMoon />
            ) : (
              <FiSun className="text-warning" />
            )}
          </button>

          {userData ? (
            <div className="relative">
              {/* User Avatar */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 lg:w-11 lg:h-11 rounded-full border-2 border-primary p-0.5 overflow-hidden shadow-md"
              >
                <img
                  src={userData.photo || "https://i.ibb.co/4pDNd9p/avatar.png"}
                  alt="User"
                  className="w-full h-full object-cover rounded-full"
                />
              </motion.button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute right-0 mt-3 w-56 bg-base-100 rounded-xl shadow-2xl border border-base-200 overflow-hidden"
                  >
                    <div className="p-4 border-b border-base-200 bg-base-200/50">
                      <p className="text-sm font-bold text-base-content truncate">
                        {userData.name || "User"}
                      </p>
                      <p className="text-xs text-base-content/70 truncate">
                        {userData.email}
                      </p>
                    </div>
                    <ul className="py-2">
                      <li>
                        <Link
                          to="/dashboard"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-primary/10 hover:text-primary transition-colors text-base-content"
                        >
                          <MdDashboard /> Dashboard
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 hover:text-red-500 transition-colors text-red-500 text-left"
                        >
                          <FiLogOut /> Logout
                        </button>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Login Button */
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary px-6 text-white rounded-full shadow-lg shadow-primary/30"
              >
                <FiLogIn className="mr-1" /> Login
              </motion.button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden btn btn-ghost btn-circle text-primary text-2xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-base-200 overflow-hidden"
          >
            <ul className="flex flex-col p-4 gap-2">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? "bg-primary text-white shadow-md"
                          : "hover:bg-base-200 text-base-content"
                      }`
                    }
                  >
                    {link.icon}
                    <span className="font-medium">{link.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
