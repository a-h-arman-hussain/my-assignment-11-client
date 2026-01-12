import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaStar,
  FaUniversity,
} from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Loader from "../../../Shared/Loader/Loader";

const StudentDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [applications, setApplications] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user?.email) return;
        const [appsRes, reviewsRes] = await Promise.all([
          axiosSecure.get(`/my-applications?email=${user.email}`),
          axiosSecure.get(`/my-reviews?email=${user.email}`),
        ]);

        const apps = appsRes.data || [];
        setApplications(apps.slice(0, 5)); // টপ ৫টি দেখানো হচ্ছে

        setStats({
          total: apps.length,
          completed: apps.filter((a) => a.applicationStatus === "completed")
            .length,
          pending: apps.filter(
            (a) => !a.applicationStatus || a.applicationStatus === "pending"
          ).length,
        });
        setReviews(reviewsRes.data.slice(0, 5) || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [axiosSecure, user]);

  if (loading) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-8 space-y-10 min-h-screen bg-base-200/50"
    >
      {/* Welcome Header - Student Dashboard */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 pb-6 border-b border-base-200">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          {/* ১. সাব-টাইটেল ইন্ডিকেটর: ইউজার রোল */}
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
            <span className="text-primary font-black tracking-[0.3em] uppercase text-[9px] md:text-[10px]">
              Scholar Dashboard
            </span>
          </div>

          {/* ২. মেইন টাইটেল - Standardized Typography */}
          <h1 className="text-3xl md:text-5xl font-black text-base-content uppercase tracking-tighter leading-none">
            Welcome Back,{" "}
            <span className="text-primary block md:inline mt-2 md:mt-0">
              {user?.displayName?.split(" ")[0]}!
            </span>
          </h1>

          {/* ৩. ডেসক্রিপশন */}
          <p className="text-[10px] md:text-xs font-bold opacity-40 uppercase tracking-[0.2em] md:tracking-[0.3em] mt-3 ml-1">
            Here is what's happening with your applications today
          </p>
        </motion.div>

        {/* ৪. পোর্টাল স্ট্যাটাস ও ভার্সন - রাইট সাইড */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:flex flex-col items-end"
        >
          <div className="flex items-center gap-2 bg-base-200 px-4 py-2 rounded-2xl border border-base-300">
            <span className="text-[10px] font-black text-base-content opacity-40 uppercase tracking-widest">
              Portal v2.0
            </span>
            <div className="w-1 h-4 bg-primary/20 rounded-full"></div>
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">
              Active
            </span>
          </div>
        </motion.div>
      </header>

      {/* 1. Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={<FaClipboardList />}
          label="Total Applied"
          value={stats.total}
          color="bg-primary"
        />
        <StatCard
          icon={<FaCheckCircle />}
          label="Completed"
          value={stats.completed}
          color="bg-success"
        />
        <StatCard
          icon={<FaClock />}
          label="Pending Review"
          value={stats.pending}
          color="bg-warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 2. Recent Applications */}
        <section className="bg-base-100 rounded-[2.5rem] shadow-xl border border-base-300 overflow-hidden">
          <div className="p-6 border-b border-base-200 flex justify-between items-center">
            <h2 className="font-black text-neutral uppercase text-sm tracking-widest flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div> Recent
              Applications
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-base-200/50">
                <tr className="text-[10px] uppercase tracking-widest text-neutral/50 border-none">
                  <th className="pl-8">Scholarship</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr
                    key={app._id}
                    className="border-b border-base-200 last:border-none"
                  >
                    <td className="pl-8 py-4">
                      <p className="font-bold text-sm text-neutral">
                        {app.scholarshipName}
                      </p>
                      <p className="text-[10px] font-medium opacity-50">
                        {app.universityName}
                      </p>
                    </td>
                    <td>
                      <span
                        className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                          app.applicationStatus === "completed"
                            ? "bg-success/10 text-success"
                            : "bg-warning/10 text-warning"
                        }`}
                      >
                        {app.applicationStatus || "pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. Recent Reviews */}
        <section className="bg-base-100 rounded-[2.5rem] shadow-xl border border-base-300 overflow-hidden">
          <div className="p-6 border-b border-base-200">
            <h2 className="font-black text-neutral uppercase text-sm tracking-widest flex items-center gap-2">
              <div className="w-2 h-2 bg-warning rounded-full"></div> Latest
              Feedback
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {reviews.map((r) => (
              <div
                key={r._id}
                className="bg-base-200/40 p-4 rounded-2xl flex items-start gap-4"
              >
                <div className="p-3 bg-white rounded-xl shadow-sm text-warning">
                  <FaStar size={16} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-[10px] uppercase text-primary">
                      {r.rating}/5 Rating
                    </span>
                    <span className="text-[10px] opacity-30 font-bold">
                      • {new Date(r.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-neutral mt-1 line-clamp-1 italic opacity-70">
                    "{r.comment}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-base-100 p-8 rounded-[2.5rem] shadow-xl border border-base-300 relative overflow-hidden group">
    <div
      className={`absolute -right-4 -top-4 w-24 h-24 ${color} opacity-[0.03] rounded-full group-hover:scale-110 transition-transform duration-500`}
    ></div>
    <div className="flex items-center gap-6">
      <div
        className={`p-5 ${color} text-white rounded-[1.5rem] shadow-lg shadow-black/5`}
      >
        {React.cloneElement(icon, { size: 28 })}
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral opacity-40 mb-1">
          {label}
        </p>
        <p className="text-4xl font-black text-neutral leading-none tracking-tighter">
          {value}
        </p>
      </div>
    </div>
  </div>
);

export default StudentDashboard;
