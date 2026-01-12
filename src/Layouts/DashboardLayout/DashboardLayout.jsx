import React, { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router";
import {
  FaClipboardList,
  FaCommentDots,
  FaPlusCircle,
  FaStar,
  FaTasks,
  FaUniversity,
  FaUsersCog,
  FaChartBar,
} from "react-icons/fa";
import { MdDashboard, MdPayment } from "react-icons/md";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { RiAccountCircleLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import useRole from "../../hooks/useRole";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import logo from "../../assets/Screenshot_2025-12-13_191151-removebg-preview.png";
import Loader from "../../Pages/Shared/Loader/Loader";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const { role, roleLoading } = useRole();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  // eslint-disable-next-line no-undef
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // রোল অনুযায়ী রিডাইরেক্ট
  React.useEffect(() => {
    if (roleLoading) return;
    if (
      location.pathname === "/dashboard" ||
      location.pathname === "/dashboard/"
    ) {
      const routes = {
        Admin: "admin-dashboard",
        Moderator: "moderator-dashboard",
        Student: "my-dashboard",
      };
      if (routes[role]) navigate(routes[role], { replace: true });
    }
  }, [role, roleLoading, navigate, location.pathname]);

  if (roleLoading || isLoading) return <Loader />;

  return (
    <div className="drawer lg:drawer-open bg-base-200 min-h-screen">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* মেইন কন্টেন্ট সেকশন */}
      <div className="drawer-content flex flex-col bg-base-200">
        {/* ড্যাশবোর্ড মোবাইল হেডার */}
        <header className="sticky top-0 z-30 flex h-16 w-full items-center gap-4 border-b border-base-300 bg-base-100/60 backdrop-blur-xl px-4 lg:px-8">
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-ghost drawer-button lg:hidden"
          >
            <FiMenu className="h-6 w-6 text-primary" />
          </label>
          <div className="flex flex-1 items-center justify-between">
            <Link to="/" className="flex items-end">
              <img
                src={logo}
                alt="Logo"
                className="w-40 object-contain hover:scale-105 transition-transform"
              />
              <span className="text-[10px] opacity-40 ml-2">v2.0</span>
            </Link>

            <div className="hidden md:block italic text-xs font-bold opacity-30 uppercase tracking-[0.2em]">
              {role} Panel
            </div>
          </div>
        </header>

        {/* ড্যাশবোর্ড আউটলেট */}
        <main className="p-4 md:p-8 lg:p-10 max-w-[1600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* সাইডবার সেকশন */}
      <div className="drawer-side z-40">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <aside className="flex h-full w-80 flex-col bg-base-100 border-r border-base-300">
          {/* ইউজার প্রোফাইল কার্ড */}
          <div className="mx-6 mt-6 mb-6 p-6 rounded-[2rem] bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 flex flex-col items-center text-center">
            <div className="relative">
              <img
                src={userData?.photo || user?.photoURL}
                alt="Profile"
                className="w-20 h-20 rounded-[1.5rem] object-cover ring-4 ring-white shadow-xl"
              />
              <span className="absolute -bottom-2 -right-2 bg-success h-5 w-5 rounded-full border-4 border-white"></span>
            </div>
            <h3 className="mt-4 font-black text-neutral truncate w-full">
              {userData?.name || "User Name"}
            </h3>
            <span
              className={`mt-2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg ${
                role === "Admin"
                  ? "bg-primary"
                  : role === "Moderator"
                  ? "bg-secondary"
                  : "bg-accent"
              }`}
            >
              {role}
            </span>
          </div>

          {/* মেনু আইটেম */}
          <nav className="flex-1 space-y-2 px-6 overflow-y-auto custom-scrollbar">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 mb-4 ml-4">
              Main Menu
            </div>

            <ul className="space-y-2">
              {/* রোল ভিত্তিক ডাইনামিক রেন্ডারিং */}
              {role === "Admin" && (
                <>
                  <DashboardLink
                    to="/dashboard/admin-dashboard"
                    icon={MdDashboard}
                    label="Admin Overview"
                  />
                  <DashboardLink
                    to="/dashboard/add-scholarship"
                    icon={FaPlusCircle}
                    label="Add Scholarship"
                  />
                  <DashboardLink
                    to="/dashboard/manage-scholarships"
                    icon={FaUniversity}
                    label="Scholarship Hub"
                  />
                  <DashboardLink
                    to="/dashboard/manage-users"
                    icon={FaUsersCog}
                    label="User Control"
                  />
                  <DashboardLink
                    to="/dashboard/analytics"
                    icon={FaChartBar}
                    label="Platform Stats"
                  />
                </>
              )}

              {role === "Moderator" && (
                <>
                  <DashboardLink
                    to="/dashboard/moderator-dashboard"
                    icon={MdDashboard}
                    label="Moderator Home"
                  />
                  <DashboardLink
                    to="/dashboard/manage-applications"
                    icon={FaTasks}
                    label="Applications Review"
                  />
                  <DashboardLink
                    to="/dashboard/all-reviews"
                    icon={FaCommentDots}
                    label="Review Management"
                  />
                </>
              )}

              {/* কমন স্টুডেন্ট টুলস */}
              <div className="pt-4 mt-4 border-t border-base-200">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 mb-4 ml-4">
                  Self Service
                </div>
                <DashboardLink
                  to="/dashboard/my-dashboard"
                  icon={MdDashboard}
                  label="My Dashboard"
                />
                <DashboardLink
                  to="/dashboard/my-applications"
                  icon={FaClipboardList}
                  label="Applications"
                />
                <DashboardLink
                  to="/dashboard/my-reviews"
                  icon={FaStar}
                  label="Reviews"
                />
                <DashboardLink
                  to="/dashboard/payment-history"
                  icon={MdPayment}
                  label="Payments"
                />
              </div>
            </ul>
          </nav>

          {/* নিচের অ্যাকশন বাটন */}
          <div className="p-6 space-y-3">
            <DashboardLink
              to="/dashboard/user-profile"
              icon={RiAccountCircleLine}
              label="Settings"
            />
            <button
              onClick={logOut}
              className="flex w-full items-center gap-3 rounded-2xl bg-error/10 px-4 py-4 font-black uppercase tracking-widest text-error hover:bg-error hover:text-white transition-all duration-300"
            >
              <FiLogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

// কাস্টম লিংক কম্পোনেন্ট - Global UI Rule: Rounded 2xl
const DashboardLink = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-4 px-5 py-4 rounded-[1.2rem] font-bold transition-all duration-300 group ${
        isActive
          ? "bg-primary text-white shadow-lg shadow-primary/20"
          : "text-base-content/60 hover:bg-primary/5 hover:text-primary"
      }`
    }
  >
    <Icon className={`h-5 w-5 transition-transform group-hover:scale-110`} />
    <span className="text-sm tracking-tight">{label}</span>
  </NavLink>
);

export default DashboardLayout;
