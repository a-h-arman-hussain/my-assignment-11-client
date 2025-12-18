import React from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router";
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
import { MdAnalytics, MdDashboard, MdPayment } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { RiAccountCircleLine } from "react-icons/ri";
import logo from "../../assets/Screenshot_2025-12-13_191151-removebg-preview.png";
import Loader from "../../Pages/Shared/Loader/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const { role, roleLoading } = useRole();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Redirect based on role
  React.useEffect(() => {
    if (roleLoading) return;

    if (location.pathname === "/dashboard") {
      if (role === "Admin") navigate("admin-dashboard", { replace: true });
      else if (role === "Moderator")
        navigate("moderator-dashboard", { replace: true });
      else if (role === "Student") navigate("my-dashboard", { replace: true });
    }
  }, [role, roleLoading, navigate, location.pathname]);

  if (roleLoading || isLoading) return <Loader />;

  return (
    <div className="drawer lg:drawer-open bg-base-200 text-neutral h-screen overflow-auto">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* NAVBAR */}
      <div className="drawer-content flex flex-col">
        <nav className="navbar w-full bg-primary/10 shadow-md backdrop-blur-xl sticky top-0 z-10 px-6">
          <div className="flex-1 flex items-center justify-start">
            <label
              htmlFor="my-drawer-4"
              className="lg:hidden text-primary mr-2 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <Link to="/">
              <img src={logo} alt="" className="w-40 h-12" />
            </Link>
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <main className="p-2 md:p-6 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          className="drawer-overlay bg-primary/10 backdrop-blur-lg sticky top-0 z-50"
        ></label>

        <aside className="flex flex-col w-64 bg-gradient-to-b from-primary/20 to-white md:border-r border-base-300 shadow-lg sticky top-0 z-50 min-h-screen overflow-y-hidden transition-all duration-300 md:pt-0">
          {/* User Profile */}
          <div className="flex flex-col items-center py-6 border-b border-base-300 ml-2">
            z
            <img
              src={userData?.photo}
              alt="User Avatar"
              className="w-15 h-15 rounded-full bg-white border-2 border-primary shadow-sm"
            />
            <h3 className="mt-3 text-lg font-semibold text-neutral text-center">
              {userData?.name || user?.displayName || "Unnamed User"}
            </h3>
            <p
              className={`text-sm font-medium px-3 pb-0.5 rounded-xl text-white ${
                role === "Admin"
                  ? "bg-primary"
                  : role === "Moderator"
                  ? "bg-secondary"
                  : role === "Student"
                  ? "bg-blue-500"
                  : "text-muted"
              }`}
            >
              {role}
            </p>
          </div>

          {/* Menu Items */}
          <ul className="menu grow p-4 space-y-2 overflow-y-auto md:overflow-y-visible">
            {/* ADMIN */}
            {role === "Admin" && (
              <>
                <DashboardLink
                  to="/dashboard/admin-dashboard"
                  icon={MdDashboard}
                >
                  Dashboard
                </DashboardLink>
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
                <DashboardLink to="/dashboard/analytics" icon={MdAnalytics}>
                  Analytics
                </DashboardLink>
                <DashboardLink
                  to="/dashboard/my-applications"
                  icon={FaClipboardList}
                >
                  My Applications
                </DashboardLink>
                <DashboardLink to="/dashboard/my-reviews" icon={FaStar}>
                  My Reviews
                </DashboardLink>
                <DashboardLink to="/dashboard/payment-history" icon={MdPayment}>
                  Payment History
                </DashboardLink>
              </>
            )}

            {/* MODERATOR */}
            {role === "Moderator" && (
              <>
                <DashboardLink
                  to="/dashboard/moderator-dashboard"
                  icon={MdDashboard}
                >
                  Dashboard
                </DashboardLink>
                <DashboardLink
                  to="/dashboard/manage-applications"
                  icon={FaTasks}
                >
                  Manage Applications
                </DashboardLink>

                <DashboardLink to="/dashboard/all-reviews" icon={FaCommentDots}>
                  All Reviews
                </DashboardLink>
                <DashboardLink
                  to="/dashboard/my-applications"
                  icon={FaClipboardList}
                >
                  My Applications
                </DashboardLink>
                <DashboardLink to="/dashboard/my-reviews" icon={FaStar}>
                  My Reviews
                </DashboardLink>
                <DashboardLink to="/dashboard/payment-history" icon={MdPayment}>
                  Payment History
                </DashboardLink>
              </>
            )}

            {/* STUDENT */}
            {role === "Student" && (
              <>
                <DashboardLink to="/dashboard/my-dashboard" icon={MdDashboard}>
                  Dashboard
                </DashboardLink>
                <DashboardLink
                  to="/dashboard/my-applications"
                  icon={FaClipboardList}
                >
                  My Applications
                </DashboardLink>
                <DashboardLink to="/dashboard/my-reviews" icon={FaStar}>
                  My Reviews
                </DashboardLink>
                <DashboardLink to="/dashboard/payment-history" icon={MdPayment}>
                  Payment History
                </DashboardLink>
              </>
            )}
          </ul>

          <ul className="p-4 space-y-2">
            <DashboardLink
              to="/dashboard/user-profile"
              icon={RiAccountCircleLine}
            >
              My Profile
            </DashboardLink>
            <button
              className="flex items-center gap-3 p-2 rounded-lg transition-all bg-red-600 w-full font-semibold text-white cursor-pointer"
              onClick={logOut}
            >
              <FiLogOut />
              Log Out
            </button>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;

const DashboardLink = ({ to, icon: Icon, children }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 p-2 rounded-lg transition-all ${
          isActive ? "bg-primary text-base-100 font-semibold" : "text-neutral"
        }`
      }
    >
      <Icon size={20} />
      <span>{children}</span>
    </NavLink>
  </li>
);
