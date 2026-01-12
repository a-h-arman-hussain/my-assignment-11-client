import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiLayers, FiClock, FiActivity, FiCheckCircle } from "react-icons/fi";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loader from "../../../Shared/Loader/Loader";
import { Link } from "react-router";

const ModeratorDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    processing: 0,
    complete: 0,
  });
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/applications");
        const data = res.data || [];
        setApplications(data);

        setStats({
          total: data.length,
          pending: data.filter((a) => a.applicationStatus === "pending").length,
          processing: data.filter((a) => a.applicationStatus === "processing")
            .length,
          complete: data.filter((a) => a.applicationStatus === "completed")
            .length,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [axiosSecure]);

  if (loading) return <Loader />;

  return (
    <div className="p-4 md:p-8 space-y-10 min-h-screen">
      {/* Moderator Overview Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-6 border-b border-base-200">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          {/* ১. সাব-টাইটেল ইন্ডিকেটর */}
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
            <span className="text-primary font-black tracking-[0.3em] uppercase text-[10px]">
              Moderator Console
            </span>
          </div>

          {/* ২. মেইন টাইটেল - Standardized Typography (text-base-content + tracking-tighter) */}
          <h1 className="text-3xl md:text-5xl font-black text-base-content uppercase tracking-tighter leading-none">
            Moderator <span className="text-primary">Overview</span>
          </h1>

          {/* ৩. ডেসক্রিপশন */}
          <p className="text-[10px] md:text-xs font-bold opacity-40 uppercase tracking-[0.2em] md:tracking-[0.3em] mt-3 ml-1">
            Real-time scholarship application metrics & activities
          </p>
        </motion.div>

        {/* ৪. সিস্টেম স্ট্যাটাস ইন্ডিকেটর - থিম ফ্রেন্ডলি লুক */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-base-200/50 px-6 py-3 rounded-[1.5rem] border border-base-300 shadow-sm flex items-center gap-3 self-start md:self-center"
        >
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest opacity-60 text-base-content">
            System Active
          </span>
        </motion.div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FiLayers />}
          label="Total Apps"
          value={stats.total}
          color="text-primary"
          bgColor="bg-primary/10"
        />
        <StatCard
          icon={<FiClock />}
          label="Pending"
          value={stats.pending}
          color="text-warning"
          bgColor="bg-warning/10"
        />
        <StatCard
          icon={<FiActivity />}
          label="Processing"
          value={stats.processing}
          color="text-info"
          bgColor="bg-info/10"
        />
        <StatCard
          icon={<FiCheckCircle />}
          label="Completed"
          value={stats.complete}
          color="text-secondary"
          bgColor="bg-secondary/10"
        />
      </div>

      {/* Recent Applications Table Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-base-100 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-base-300 overflow-hidden"
      >
        <div className="p-8 border-b border-base-200 flex items-center justify-between">
          <div className="flex flex-col space-y-1">
            {/* ১. সাব-টাইটেল ইন্ডিকেটর (গ্লোবাল স্টাইল) */}
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
              <span className="text-primary font-black tracking-[0.3em] uppercase text-[9px] md:text-[10px]">
                Live Updates
              </span>
            </div>

            {/* ২. মেইন টাইটেল - Standardized Typography */}
            <h2 className="text-2xl md:text-3xl font-black text-base-content uppercase tracking-tighter leading-none">
              Recent <span className="text-primary">Activity</span>
            </h2>

            {/* ৩. ডেকোরেটিভ ডিভাইডার লাইন (ঐচ্ছিক: সেকশন আলাদা করার জন্য) */}
            <div className="w-12 h-1 bg-primary/20 rounded-full mt-4"></div>
          </div>
          <Link to="/dashboard/manage-applications" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-base-200/40">
                <th className="p-6 text-[10px] font-black uppercase tracking-widest opacity-40">
                  Student Name
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest opacity-40">
                  Scholarship
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest opacity-40 text-center">
                  Current Status
                </th>
              </tr>
            </thead>
            <tbody>
              {applications.slice(0, 5).map((app) => (
                <tr
                  key={app._id}
                  className="hover:bg-base-200/30 transition-colors"
                >
                  <td className="p-6 border-b border-base-200">
                    <p className="font-bold text-sm text-neutral">
                      {app.studentName}
                    </p>
                  </td>
                  <td className="p-6 border-b border-base-200">
                    <p className="text-xs font-medium text-neutral opacity-70 uppercase tracking-tighter">
                      {app.scholarshipName}
                    </p>
                  </td>
                  <td className="p-6 border-b border-base-200 text-center">
                    <StatusBadge status={app.applicationStatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

// Internal Small Components
// রিফাইনড স্ট্যাট কার্ড - Unified Dashboard Standard
const StatCard = ({ icon, label, value, color, bgColor }) => (
  <motion.div
    whileHover={{ y: -8 }}
    className="bg-base-100 p-8 rounded-[2.5rem] shadow-xl shadow-black/[0.02] border border-base-200 flex flex-col items-center text-center group transition-all duration-500 hover:border-primary/20"
  >
    {/* আইকন কন্টেইনার - Squiracle Style */}
    <div
      className={`${bgColor} ${color} p-5 rounded-[1.5rem] mb-5 group-hover:rotate-[10deg] transition-all duration-500 shadow-inner`}
    >
      {React.cloneElement(icon, { size: 32 })}
    </div>

    {/* লেবেল - Unified Typography */}
    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-base-content opacity-40 mb-2">
      {label}
    </p>

    {/* ভ্যালু - High Contrast Standard */}
    <p className="text-4xl md:text-5xl font-black text-base-content tracking-tighter leading-none">
      {value}
    </p>

    {/* ডেকোরেটিভ ডট (ঐচ্ছিক) */}
    <div className="w-1.5 h-1.5 rounded-full bg-primary/20 mt-6 group-hover:w-8 transition-all duration-500"></div>
  </motion.div>
);

// রিফাইনড স্ট্যাটাস ব্যাজ - Unified Brand Language
const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-warning/10 text-warning border-warning/20",
    processing: "bg-info/10 text-info border-info/20",
    completed: "bg-success/10 text-success border-success/20",
    rejected: "bg-error/10 text-error border-error/20",
  };

  return (
    <div className="flex items-center gap-2">
      <span
        className={`px-4 py-1.5 rounded-2xl border text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
          styles[status?.toLowerCase()] ||
          "bg-base-200 text-base-content/50 border-base-300"
        }`}
      >
        <span className="flex items-center gap-1.5">
          {/* স্ট্যাটাস ইন্ডিকেটর ডট */}
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
          {status}
        </span>
      </span>
    </div>
  );
};

export default ModeratorDashboard;
