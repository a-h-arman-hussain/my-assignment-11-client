import React, { useEffect, useState } from "react";
import {
  FaUsersCog,
  FaUniversity,
  FaClipboardList,
  FaArrowUp,
} from "react-icons/fa";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loader from "../../../Shared/Loader/Loader";
import { Link } from "react-router";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalScholarships: 0,
    totalApplications: 0,
  });
  const [users, setUsers] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, scholarshipsRes, applicationsRes] = await Promise.all([
          axiosSecure.get("/users"),
          axiosSecure.get("/all-scholarships"),
          axiosSecure.get("/applications"),
        ]);

        setUsers(usersRes.data || []);
        setScholarships(scholarshipsRes.data || []);
        setApplications(applicationsRes.data || []);
        setStats({
          totalUsers: usersRes.data?.length || 0,
          totalScholarships: scholarshipsRes.data?.length || 0,
          totalApplications: applicationsRes.data?.length || 0,
        });
      } catch (err) {
        console.error("Data Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosSecure]);

  if (loading) return <Loader />;

  return (
    <div className="space-y-10 pb-10">
      {/* Dashboard Main Header - System Overview */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-6 border-b border-base-200">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          {/* ১. সাব-টাইটেল: অ্যাডমিন ইন্ডিকেটর */}
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-primary/40"></div>
            <span className="text-primary font-black tracking-[0.3em] uppercase text-[10px]">
              Analytics Dashboard
            </span>
          </div>

          {/* ২. মেইন টাইটেল: ডাইনামিক এবং বোল্ড টাইপোগ্রাফি */}
          <h1 className="text-3xl md:text-5xl font-black text-base-content uppercase tracking-tighter leading-none">
            System <span className="text-primary">Overview</span>
          </h1>

          {/* ৩. ডেসক্রিপশন: প্রফেশনাল অপাসিটি */}
          <p className="text-[10px] md:text-xs font-bold opacity-40 uppercase tracking-[0.2em] mt-3 ml-1">
            Real-time platform statistics & insights
          </p>
        </motion.div>

        {/* ৪. লাইভ স্ট্যাটাস ইন্ডিকেটর (রাইট সাইড) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-primary/5 text-primary px-5 py-3 rounded-[1.5rem] border border-primary/20 flex items-center gap-3 self-start md:self-center"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          <span className="font-black uppercase tracking-widest text-[10px]">
            Live Data Monitoring
          </span>
        </motion.div>
      </header>

      {/* ১. স্ট্যাট কার্ডস (Global Rule: Rounded-3xl & Icons) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Total Users"
          value={stats.totalUsers}
          icon={FaUsersCog}
          color="bg-primary"
          trend="+12%"
        />
        <StatCard
          label="Scholarships"
          value={stats.totalScholarships}
          icon={FaUniversity}
          color="bg-secondary"
          trend="+5"
        />
        <StatCard
          label="Applications"
          value={stats.totalApplications}
          icon={FaClipboardList}
          color="bg-accent"
          trend="+24%"
        />
      </section>

      {/* ২. ডেটা টেবিল গ্রিড */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        {/* ইউজার টেবিল */}
        <TableContainer
          title="Recent Users"
          viewAllPath="/dashboard/manage-users"
        >
          <table className="table w-full">
            <thead className="bg-base-200/50">
              <tr className="border-none text-neutral opacity-50 uppercase text-[10px] tracking-widest">
                <th>Name</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, 5).map((u) => (
                <tr
                  key={u._id}
                  className="border-b border-base-200 last:border-none"
                >
                  <td className="font-bold text-sm">{u.name}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white ${
                        u.role === "Admin"
                          ? "bg-primary"
                          : u.role === "Moderator"
                          ? "bg-secondary"
                          : "bg-blue-500"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>

        {/* স্কলারশিপ টেবিল */}
        <TableContainer
          title="Latest Scholarships"
          viewAllPath="/dashboard/manage-scholarships"
        >
          <table className="table w-full">
            <thead className="bg-base-200/50">
              <tr className="border-none text-neutral opacity-50 uppercase text-[10px] tracking-widest">
                <th>University</th>
                <th>Fees</th>
              </tr>
            </thead>
            <tbody>
              {scholarships.slice(0, 5).map((s) => (
                <tr
                  key={s._id}
                  className="border-b border-base-200 last:border-none"
                >
                  <td className="font-bold text-sm truncate max-w-[150px]">
                    {s.universityName}
                  </td>
                  <td className="text-primary font-black text-xs">
                    ${s.applicationFees}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </div>
    </div>
  );
};

// --- হেল্পার কম্পোনেন্ট: স্ট্যাট কার্ড ---
const StatCard = ({ label, value, icon: Icon, color, trend }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-base-100 p-8 rounded-[2.5rem] border border-base-300 shadow-xl flex items-center gap-6 group"
  >
    <div
      className={`p-5 rounded-3xl ${color} text-white shadow-lg shadow-inner group-hover:scale-110 transition-transform`}
    >
      <Icon size={32} />
    </div>
    <div>
      <p className="text-xs font-black text-neutral/40 uppercase tracking-widest">
        {label}
      </p>
      <div className="flex items-baseline gap-2">
        <h2 className="text-3xl font-black text-neutral">{value}</h2>
        <span className="text-[10px] font-bold text-success flex items-center gap-0.5">
          <FaArrowUp /> {trend}
        </span>
      </div>
    </div>
  </motion.div>
);

// --- হেল্পার কম্পোনেন্ট: টেবিল কন্টেইনার ---
const TableContainer = ({ title, children, viewAllPath }) => (
  <div className="bg-base-100 rounded-[2.5rem] border border-base-300 shadow-xl overflow-hidden">
    <div className="p-6 border-b border-base-200 flex justify-between items-center bg-base-100">
      <h3 className="font-black text-neutral uppercase tracking-tighter">
        {title}
      </h3>
      <Link
        to={viewAllPath}
        className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline cursor-pointer"
      >
        View All
      </Link>
    </div>
    <div className="overflow-x-auto p-2">{children}</div>
  </div>
);

export default AdminDashboard;
