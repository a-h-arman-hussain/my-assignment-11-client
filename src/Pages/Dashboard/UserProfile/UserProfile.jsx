import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import { FiMail, FiCamera, FiShield, FiUser } from "react-icons/fi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../utils";
import Loader from "../../Shared/Loader/Loader";

const UserProfile = () => {
  const { user } = useAuth();
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const [tempAvatar, setTempAvatar] = useState("");
  const [tempCover, setTempCover] = useState("");

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleImageChange = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const uploadedURL = await imageUpload(file);

      if (type === "avatar") setTempAvatar(uploadedURL);
      if (type === "cover") setTempCover(uploadedURL);

      const payload = { email: user.email };
      if (type === "avatar") payload.photo = uploadedURL;
      if (type === "cover") payload.cover = uploadedURL;

      await axiosSecure.patch("/users/update", payload);
      queryClient.invalidateQueries(["user", user.email]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pb-20"
    >
      {/* 1. Cover Photo Section */}
      <div className="relative h-72 md:h-96 w-full overflow-hidden">
        <img
          src={
            tempCover ||
            userData?.cover ||
            "https://i.ibb.co/vY8p0XN/default-cover.jpg"
          }
          alt="Cover"
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30" />{" "}
        {/* Overlay for better contrast */}
        <label className="absolute top-6 right-6 flex cursor-pointer items-center gap-2 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 px-6 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-white/40 transition-all shadow-2xl">
          <FiCamera size={18} />
          {loading ? "Uploading..." : "Change Cover"}
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => handleImageChange(e, "cover")}
          />
        </label>
      </div>

      {/* 2. Profile Card Content */}
      <div className="relative mx-auto -mt-32 max-w-5xl px-4">
        <div className="bg-base-100 rounded-[3rem] p-8 md:p-12 shadow-2xl border border-base-300 relative">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-8 -mt-24 md:-mt-36">
            {/* Profile Avatar */}
            <div className="relative group">
              <div className="h-44 w-44 md:h-56 md:w-56 rounded-[2.5rem] border-[8px] border-base-100 overflow-hidden shadow-2xl bg-base-300">
                <img
                  src={tempAvatar || userData?.photo || user?.photoURL}
                  alt="Avatar"
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <label className="absolute bottom-4 right-4 grid h-12 w-12 cursor-pointer place-items-center rounded-2xl bg-primary text-white shadow-xl shadow-primary/40 hover:scale-110 active:scale-95 transition-all">
                <FiCamera size={20} />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, "avatar")}
                />
              </label>
            </div>

            {/* Profile Info Text Section */}
            <div className="flex-1 text-center md:text-left pb-4 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center gap-4"
              >
                {/* ১. ইউজার নেম - Standardized Typography (text-5xl for profile focus) */}
                <h2 className="text-xl md:text-3xl font-black text-base-content uppercase tracking-tighter leading-none">
                  {userData?.name || user.displayName || "Anonymous"}
                </h2>

                {/* ২. রোল ব্যাজ - ইউনিফাইড প্রাইমারি স্টাইল */}
                <div className="flex items-center justify-center md:justify-start gap-2 bg-primary/10 px-4 py-2 rounded-2xl border border-primary/20 shadow-sm self-center md:self-auto">
                  <FiShield className="text-primary animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                    {role || "Member"}
                  </span>
                </div>
              </motion.div>

              {/* ৩. ইমেইল ও আইডি সেকশন */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-6"
              >
                {/* ইমেইল ইন্ডিকেটর */}
                <div className="flex items-center gap-2 text-xs font-bold opacity-40 lowercase tracking-widest hover:opacity-80 transition-opacity">
                  <FiMail size={16} className="text-primary" />
                  <span className="select-all">
                    {userData?.email || user.email}
                  </span>
                </div>

                {/* ৪. ভিজ্যুয়াল ডিভাইডার (ডেক্সটপে) */}
                <div className="hidden md:block w-1 h-4 bg-base-300 rounded-full"></div>

                {/* জয়েনিং বা স্ট্যাটাস ইন্ডিকেটর */}
                <div className="flex items-center gap-2 text-[10px] font-bold opacity-40 uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
                  <span>Verified Profile</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* 3. Stats/Bio placeholder Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5 pt-5 border-t border-base-200">
            <InfoBox
              icon={<FiUser />}
              label="Full Name"
              value={userData?.name || user.displayName}
            />
            <InfoBox
              icon={<FiShield />}
              label="Account Type"
              value={role === "admin" ? "Administrator" : role}
            />
            <InfoBox
              icon={<FiMail />}
              label="Verified Email"
              value={userData?.email || user.email}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Reusable Info Component
const InfoBox = ({ icon, label, value }) => (
  <div className="bg-base-200/40 p-6 rounded-[2rem] border border-base-200 transition-hover hover:bg-base-200/60">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 bg-primary/10 rounded-lg text-primary">{icon}</div>
      <span className="text-[10px] font-black uppercase tracking-widest opacity-40">
        {label}
      </span>
    </div>
    <p className="text-sm font-black text-neutral truncate capitalize">
      {value || "N/A"}
    </p>
  </div>
);

export default UserProfile;
