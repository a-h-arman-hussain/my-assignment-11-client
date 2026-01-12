import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { FaUserFriends, FaGem, FaGraduationCap } from "react-icons/fa";

const Analytics = () => {
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState({
    usersCount: 0,
    totalFees: 0,
    totalScholarships: 0,
    applicationsData: [],
  });
  const [loading, setLoading] = useState(true);

  const COLORS = ["#7C3AED", "#EC4899", "#14B8A6", "#374151", "#F59E0B"];

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [usersRes, scholarshipsRes, applicationsRes] = await Promise.all([
          axiosSecure.get("/users"),
          axiosSecure.get("/all-scholarships"),
          axiosSecure.get("/applications"),
        ]);

        const scholarships = scholarshipsRes.data;
        const applications = applicationsRes.data;

        const fees = applications.reduce((acc, curr) => {
          const scholarship = scholarships.find(
            (s) => s._id === curr.scholarshipId
          );
          return acc + (scholarship?.applicationFees || 0);
        }, 0);

        const chartMap = {};
        applications.forEach((app) => {
          const scholarship = scholarships.find(
            (s) => s._id === app.scholarshipId
          );
          if (scholarship) {
            chartMap[scholarship.universityName] =
              (chartMap[scholarship.universityName] || 0) + 1;
          }
        });

        const chartData = Object.entries(chartMap).map(([name, value]) => ({
          name,
          value,
        }));

        setData({
          usersCount: usersRes.data.length,
          totalFees: fees,
          totalScholarships: scholarships.length,
          applicationsData: chartData,
        });
      } catch (err) {
        console.error("Analytics Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [axiosSecure]);

  if (loading)
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto space-y-6 md:space-y-12 p-2 sm:p-4"
    >
      {/* Platform Performance Header */}
      <div className="text-center md:text-left px-2 mb-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* ১. মেইন টাইটেল - ডাইনামিক বেস-কন্টেন্ট এবং প্রাইমারি হাইলাইট */}
          <h1 className="text-3xl md:text-5xl font-black text-base-content uppercase tracking-tighter leading-none">
            Platform <span className="text-primary">Performance</span>
          </h1>

          {/* ২. সাব-টাইটেল - ইউনিফাইড ট্র্যাকিং এবং অপাসিটি */}
          <div className="flex items-center justify-center md:justify-start gap-2 mt-3">
            <div className="hidden md:block w-8 h-[2px] bg-primary/30"></div>
            <p className="text-[10px] md:text-xs font-black opacity-40 text-base-content uppercase tracking-[0.3em] md:tracking-[0.5em]">
              Insights & Statistics
            </p>
          </div>
        </motion.div>
      </div>

      {/* ২. প্রিমিয়াম সামারি কার্ডস - Grid 1 column on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        <AnalyticsCard
          title="Total Users"
          value={data.usersCount}
          icon={<FaUserFriends />}
          color="text-orange-600"
          bg="bg-orange-50"
        />
        <AnalyticsCard
          title="Total Revenue"
          value={`$${data.totalFees.toLocaleString()}`}
          icon={<FaGem />}
          color="text-teal-600"
          bg="bg-teal-50"
        />
        <AnalyticsCard
          title="Scholarships"
          value={data.totalScholarships}
          icon={<FaGraduationCap />}
          color="text-pink-600"
          bg="bg-pink-50"
        />
      </div>

      {/* ৩. চার্ট সেকশন - Stack on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
        {/* বার চার্ট */}
        <ChartBox title="University-wise Applications">
          <div className="h-[300px] md:h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.applicationsData}
                margin={{ top: 10, right: 10, left: -20, bottom: 40 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  strokeOpacity={0.05}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  fontSize={9}
                  angle={-25}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis axisLine={false} tickLine={false} fontSize={10} />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={30}>
                  {data.applicationsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartBox>

        {/* পাই চার্ট */}
        <ChartBox title="Application Distribution">
          <div className="h-[350px] md:h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.applicationsData}
                  innerRadius="60%"
                  outerRadius="80%"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.applicationsData.map((entry, index) => (
                    <Cell
                      key={`cell-pie-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ fontSize: "10px", paddingTop: "10px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartBox>
      </div>
    </motion.div>
  );
};

// হেল্পার কার্ড কম্পোনেন্ট - Global Dashboard Style
const AnalyticsCard = ({ title, value, icon, color, bg }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-base-100 p-6 md:p-8 rounded-[1.8rem] md:rounded-[2.5rem] border border-base-200 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex items-center gap-4 md:gap-6 group"
  >
    {/* আইকন কন্টেইনার - Squiracle Shape */}
    <div
      className={`w-14 h-14 md:w-16 md:h-16 rounded-[1.2rem] md:rounded-[1.8rem] ${bg} ${color} flex items-center justify-center text-2xl md:text-3xl transition-transform duration-500 group-hover:rotate-[10deg] shadow-inner`}
    >
      {icon}
    </div>

    <div className="min-w-0 flex-1">
      {/* টাইটেল - Unified Tracking & Opacity */}
      <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-base-content/40 truncate mb-1">
        {title}
      </p>

      {/* ভ্যালু - Standardized Typography */}
      <h2 className="text-2xl md:text-3xl font-black text-base-content tracking-tighter truncate leading-tight">
        {value}
      </h2>
    </div>
  </motion.div>
);

// হেল্পার চার্ট বক্স - Global Dashboard Style
const ChartBox = ({ title, children }) => (
  <div className="bg-base-100 p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] border border-base-200 shadow-sm relative overflow-hidden group">
    {/* ডেকোরেটিভ ব্যাকগ্রাউন্ড গ্লো (ঐচ্ছিক) */}
    <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500"></div>

    <div className="flex items-center gap-3 mb-8 md:mb-10 relative z-10">
      {/* অ্যাকসেন্ট বার - Primary Color (Unified) */}
      <div className="w-1.5 md:w-2 h-5 md:h-7 bg-primary rounded-full shadow-sm shadow-primary/40"></div>

      <h3 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-base-content opacity-50">
        {title}
      </h3>
    </div>

    {/* চার্ট এরিয়া */}
    <div className="relative z-10 w-full overflow-hidden">{children}</div>
  </div>
);

export default Analytics;
