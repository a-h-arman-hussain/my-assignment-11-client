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
} from "recharts";

const generateColorMap = (names) => {
  const colorMap = {};
  names.forEach((name, index) => {
    const hue = (index * 137.5) % 360; // golden angle
    colorMap[name] = `hsl(${hue}, 70%, 60%)`;
  });
  return colorMap;
};

const Analytics = () => {
  const axiosSecure = useAxiosSecure();
  const [usersCount, setUsersCount] = useState(0);
  const [totalFees, setTotalFees] = useState(0);
  const [totalScholarships, setTotalScholarships] = useState(0);
  const [applicationsData, setApplicationsData] = useState([]);
  const [colorMap, setColorMap] = useState({});

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Fetch users
        const usersRes = await axiosSecure.get("/users");
        setUsersCount(usersRes.data.length);

        // Fetch scholarships
        const scholarshipsRes = await axiosSecure.get("/all-scholarships");
        const scholarships = scholarshipsRes.data;
        setTotalScholarships(scholarships.length);

        // Fetch all applications
        const applicationsRes = await axiosSecure.get("/applications");
        const applications = applicationsRes.data;

        // Calculate total fees dynamically
        const fees = applications.reduce((acc, curr) => {
          const scholarship = scholarships.find(
            (s) => s._id === curr.scholarshipId
          );
          if (scholarship) return acc + (scholarship.applicationFees || 0);
          return acc;
        }, 0);
        setTotalFees(fees);

        // Prepare chart data (applications per university)
        const chartMap = {};
        applications.forEach((app) => {
          const scholarship = scholarships.find(
            (s) => s._id === app.scholarshipId
          );
          if (scholarship) {
            if (!chartMap[scholarship.universityName])
              chartMap[scholarship.universityName] = 0;
            chartMap[scholarship.universityName] += 1;
          }
        });

        const chartData = Object.entries(chartMap).map(
          ([name, applications]) => ({
            name,
            applications,
          })
        );

        setApplicationsData(chartData);

        // Generate colors
        const uniNames = chartData.map((item) => item.name);
        setColorMap(generateColorMap(uniNames));
      } catch (err) {
        console.error("Failed to fetch analytics data:", err);
      }
    };

    fetchAnalytics();
  }, [axiosSecure]);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Platform Analytics
      </h1>

      {/* Summary cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-white shadow rounded-lg text-center">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-3xl font-bold mt-2">{usersCount}</p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg text-center">
          <h2 className="text-xl font-semibold">Total Fees Collected</h2>
          <p className="text-3xl font-bold mt-2">${totalFees}</p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg text-center">
          <h2 className="text-xl font-semibold">Total Scholarships</h2>
          <p className="text-3xl font-bold mt-2">{totalScholarships}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Applications per University
          </h2>
          <BarChart
            width={500}
            height={300}
            data={applicationsData}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="applications">
              {applicationsData.map((entry) => (
                <Cell
                  key={`bar-${entry.name}`}
                  fill={colorMap[entry.name] || "#8884d8"}
                />
              ))}
            </Bar>
          </BarChart>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Applications Distribution
          </h2>
          <PieChart width={400} height={300}>
            <Pie
              data={applicationsData}
              dataKey="applications"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {applicationsData.map((entry) => (
                <Cell
                  key={`pie-${entry.name}`}
                  fill={colorMap[entry.name] || "#82ca9d"}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
