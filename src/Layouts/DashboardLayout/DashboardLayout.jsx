import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  FaClipboardList,
  FaCommentDots,
  FaPlusCircle,
  FaStar,
  FaTasks,
  FaUniversity,
  FaUsersCog,
} from "react-icons/fa";
import useRole from "../../hooks/useRole";
import useAuth from "../../hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth();
  const { role } = useRole();

  return (
    <div className="drawer lg:drawer-open bg-base-200 text-neutral h-screen overflow-auto">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* 🔹 NAVBAR */}
      <div className="drawer-content flex flex-col">
        <nav className="navbar w-full bg-base-100 shadow-md sticky top-0 z-50 px-6">
          <div className="flex-1">
            <label
              htmlFor="my-drawer-4"
              className="btn btn-square btn-ghost lg:hidden text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <Link to="/" className="text-primary font-bold text-xl ml-4">
              ScholarStream
            </Link>
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <main className="p-6 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* 🔹 SIDEBAR */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <aside className="flex flex-col bg-base-100 w-64 border-r border-base-300 shadow-lg sticky  mt-14 md:mt-0 top-0 z-50 h-full">
          {/* User Profile */}
          <div className="flex flex-col items-center py-6 border-b border-base-300">
            <img
              src={user?.photoURL || "https://i.ibb.co/4pDNd9p/avatar.png"}
              alt="User Avatar"
              className="w-16 h-16 rounded-full border-2 border-primary"
            />
            <h3 className="mt-2 font-semibold text-neutral">
              {user?.displayName}
            </h3>
            <p className="text-sm text-muted">{role}</p>
          </div>

          <ul className="menu grow p-4 space-y-2">
            {/* ---------------- ADMIN ---------------- */}
            {role === "Admin" && (
              <>
                <DashboardLink
                  to="/dashboard/add-scholarship"
                  icon={FaPlusCircle}
                >
                  Add Scholarship
                </DashboardLink>
                <DashboardLink
                  to="/dashboard/manage-scholarships"
                  icon={FaUniversity}
                >
                  Manage Scholarships
                </DashboardLink>
                <DashboardLink to="/dashboard/manage-users" icon={FaUsersCog}>
                  Manage Users
                </DashboardLink>
                <DashboardLink to="/dashboard/analytics" icon={FaTasks}>
                  Analytics
                </DashboardLink>
              </>
            )}

            {/* ---------------- MODERATOR ---------------- */}
            {role === "Moderator" && (
              <>
                <DashboardLink
                  to="/dashboard/manage-applications"
                  icon={FaTasks}
                >
                  Manage Applications
                </DashboardLink>
                <DashboardLink to="/dashboard/all-reviews" icon={FaCommentDots}>
                  All Reviews
                </DashboardLink>
              </>
            )}

            {/* ---------------- STUDENT ---------------- */}
            {role === "Student" && (
              <>
                <DashboardLink
                  to="/dashboard/my-applications"
                  icon={FaClipboardList}
                >
                  My Applications
                </DashboardLink>
                <DashboardLink to="/dashboard/my-reviews" icon={FaStar}>
                  My Reviews
                </DashboardLink>
              </>
            )}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;

// 🔹 DashboardLink Component for Modern Sidebar
const DashboardLink = ({ to, icon: Icon, children }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 p-2 rounded-lg transition-all hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 ${
          isActive
            ? "bg-gradient-to-r from-primary/40 to-secondary/40 text-base-100 font-semibold"
            : "text-neutral"
        }`
      }
    >
      <Icon size={20} />
      <span>{children}</span>
    </NavLink>
  </li>
);
