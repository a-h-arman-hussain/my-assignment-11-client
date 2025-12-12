import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-warning font-semibold"
              : "hover:text-warning transition-colors"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-scholarships"
          className={({ isActive }) =>
            isActive
              ? "text-warning font-semibold"
              : "hover:text-warning transition-colors"
          }
        >
          All Scholarships
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 relative">
      {/* Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to="/" className="btn-ghost text-xl font-bold text-primary">
          ScholarStream
        </Link>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* End */}
      <div className="navbar-end relative">
        {user ? (
          <div className="relative">
            {/* User Profile Image */}
            <img
              src={user.photoURL || ""}
              alt={user.displayName || "User"}
              className="w-10 h-10 rounded-full border-2 border-accent cursor-pointer"
              title={user.displayName}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-40 bg-base-100 rounded-lg shadow-lg py-2 z-20">
                <li className="px-4 py-2 hover:bg-base-200">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li
                  className="px-4 py-2 hover:bg-base-200 cursor-pointer"
                  onClick={logOut}
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="btn bg-primary hover:bg-primary/90 text-base-100"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
