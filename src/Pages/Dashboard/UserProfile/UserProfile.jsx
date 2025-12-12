// UserProfile.jsx
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
      className="max-w-2xl mx-auto mt-12 p-6 rounded-2xl shadow-2xl 
      bg-white/20 backdrop-blur-xl border border-white/20"
    >
      {/* Profile Header */}
      <div className="flex items-center gap-6">
        <img
          src={user.photoURL || "https://i.ibb.co/4pDNd9p/avatar.png"}
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-4 border-purple-500 shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-bold text-primary">
            {user.displayName || "Unnamed User"}
          </h2>
          <p className="flex items-center gap-2 mt-1 text-neutral">
            <FiMail /> {user.email}
          </p>
        </div>
      </div>

      <hr className="my-6 border-gray-900/20" />

      {/* User Info Cards */}
      <div className="space-y-4 text-neutral text-lg">
        <InfoCard label="Role" value={role} icon={<FiShield />} gradient />
        <InfoCard
          label="Email Verified"
          value={user.emailVerified ? "Yes" : "No"}
          icon={<FiUser />}
        />
        <InfoCard
          label="Account Created"
          value={new Date(user.metadata.creationTime).toLocaleDateString()}
          icon={<FiCalendar />}
        />
        <InfoCard
          label="Last Login"
          value={new Date(user.metadata.lastSignInTime).toLocaleDateString()}
          icon={<FiLogIn />}
        />
        {user.phoneNumber && (
          <InfoCard label="Phone" value={user.phoneNumber} icon={<FiPhone />} />
        )}
        {user.address && (
          <InfoCard label="Address" value={user.address} icon={<FiMapPin />} />
        )}
      </div>
    </div>
  );
};

// Reusable InfoCard Component
const InfoCard = ({ label, value, icon, gradient }) => (
  <div
    className={`flex items-center justify-between p-3 rounded-xl border border-white/20 shadow-sm
      ${
        gradient
          ? "bg-gradient-to-r from-purple-600/40 to-blue-600/40"
          : "bg-white/10"
      }`}
  >
    <span className="flex items-center gap-3 font-semibold text-neutral">
      {icon} {label}
    </span>
    <span className="font-medium text-neutral">{value}</span>
  </div>
);

export default UserProfile;
