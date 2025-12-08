import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { RiHome9Fill } from "react-icons/ri";
import {
  FaClipboardList,
  FaPlusCircle,
  FaStar,
  FaTasks,
  FaUniversity,
  FaUsersCog,
} from "react-icons/fa";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300 sticky top-0 z-50">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-6"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <Link to="/" className="px-4">
            ScholarStream
          </Link>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <NavLink
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right mt-2"
                data-tip="Home"
              >
                {/* Home icon */}
                <RiHome9Fill size={20} />
                <span className="is-drawer-close:hidden">Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/my-applications"
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 
                ${isActive ? "text-purple-500 font-semibold" : "text-gray-300"}`
                }
                data-tip="My Applications"
              >
                <FaClipboardList
                  size={20}
                  className={({ isActive }) =>
                    `${isActive ? "text-purple-500" : "text-gray-300"}`
                  }
                />
                <span className="is-drawer-close:hidden">My Applications</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/my-reviews"
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 
                ${isActive ? "text-purple-500 font-semibold" : "text-gray-300"}`
                }
                data-tip="My Reviews"
              >
                <FaStar
                  size={20}
                  className={({ isActive }) =>
                    `${isActive ? "text-purple-500" : "text-gray-300"}`
                  }
                />

                <span className="is-drawer-close:hidden">My Reviews</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/add-scholarship"
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 
                ${isActive ? "text-purple-500 font-semibold" : "text-gray-300"}`
                }
                data-tip="Add Scholarship"
              >
                <FaPlusCircle
                  size={20}
                  className={({ isActive }) =>
                    `${isActive ? "text-purple-500" : "text-gray-300"}`
                  }
                />

                <span className="is-drawer-close:hidden">Add Scholarship</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manage-scholarships"
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 
                ${isActive ? "text-purple-500 font-semibold" : "text-gray-300"}`
                }
                data-tip="Manage Scholarships"
              >
                <FaUniversity
                  size={20}
                  className={({ isActive }) =>
                    `${isActive ? "text-purple-500" : "text-gray-300"}`
                  }
                />

                <span className="is-drawer-close:hidden">
                  Manage Scholarships
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manage-users"
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 
                ${isActive ? "text-purple-500 font-semibold" : "text-gray-300"}`
                }
                data-tip="Manage Users"
              >
                <FaUsersCog
                  size={20}
                  className={({ isActive }) =>
                    `${isActive ? "text-purple-500" : "text-gray-300"}`
                  }
                />

                <span className="is-drawer-close:hidden">Manage Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manage-applications"
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 
                ${isActive ? "text-purple-500 font-semibold" : "text-gray-300"}`
                }
                data-tip="Manage Applications"
              >
                <FaTasks
                  size={20}
                  className={({ isActive }) =>
                    `${isActive ? "text-purple-500" : "text-gray-300"}`
                  }
                />
                <span className="is-drawer-close:hidden">
                  Manage Applications
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/all-reviews"
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 
                ${isActive ? "text-purple-500 font-semibold" : "text-gray-300"}`
                }
                data-tip="All Reviews"
              >
                <FaTasks
                  size={20}
                  className={({ isActive }) =>
                    `${isActive ? "text-purple-500" : "text-gray-300"}`
                  }
                />
                <span className="is-drawer-close:hidden">
                  All Reviews
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
