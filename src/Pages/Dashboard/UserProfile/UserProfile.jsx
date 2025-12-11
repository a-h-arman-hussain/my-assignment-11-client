import React from "react";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import {
  FiMail,
  FiUser,
  FiPhone,
  FiShield,
  FiCalendar,
  FiLogIn,
  FiMapPin,
} from "react-icons/fi";

const UserProfile = () => {
  const { user } = useAuth();
  const { role } = useRole();

  if (!user)
    return (
      <p className="text-center mt-10 text-red-500 text-lg font-semibold">
        Please log in to view your profile.
      </p>
    );

  return (
    <div
      className="max-w-2xl mx-auto mt-12 p-6 rounded-2xl shadow-xl 
      bg-white/10 backdrop-blur-xl border border-white/20"
    >
      {/* Profile Header */}
      <div className="flex items-center gap-6">
        <img
          src={user.photoURL || "https://i.ibb.co/4pDNd9p/avatar.png"}
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-4 border-purple-500 shadow-lg"
        />

        <div>
          <h2 className="text-3xl font-bold">
            {user.displayName || "Unnamed User"}
          </h2>

          <p className="flex items-center gap-2 mt-1">
            <FiMail /> {user.email}
          </p>
        </div>
      </div>

      <hr className="my-6 border-gray-900/20" />

      {/* User Info Without Reusable Component */}
      <div className="space-y-4 text-lg">
        {/* Role */}
        <div
          className="flex items-center justify-between p-3 rounded-xl 
          bg-gradient-to-r from-purple-600/40 to-blue-600/40 
          border border-white/20 shadow-sm"
        >
          <span className="flex items-center gap-3 font-semibold">
            <FiShield /> Role
          </span>
          <span>{role}</span>
        </div>

        {/* Email Verified */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/10 border border-white/20 shadow-sm">
          <span className="flex items-center gap-3 font-semibold">
            <FiUser /> Email Verified
          </span>
          <span>{user.emailVerified ? "Yes" : "No"}</span>
        </div>

        {/* Account Created */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/10 border border-white/20 shadow-sm">
          <span className="flex items-center gap-3 font-semibold">
            <FiCalendar /> Account Created
          </span>
          <span>
            {new Date(user.metadata.creationTime).toLocaleDateString()}
          </span>
        </div>

        {/* Last Login */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/10 border border-white/20 shadow-sm">
          <span className="flex items-center gap-3 font-semibold">
            <FiLogIn /> Last Login
          </span>
          <span>
            {new Date(user.metadata.lastSignInTime).toLocaleDateString()}
          </span>
        </div>

        {/* Phone */}
        {user.phoneNumber && (
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/10 border border-white/20 shadow-sm">
            <span className="flex items-center gap-3 font-semibold">
              <FiPhone /> Phone
            </span>
            <span>{user.phoneNumber}</span>
          </div>
        )}

        {/* Address */}
        {user.address && (
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/10 border border-white/20 shadow-sm">
            <span className="flex items-center gap-3 font-semibold">
              <FiMapPin /> Address
            </span>
            <span>{user.address}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
