import React, { useEffect, useState } from "react";
import { FaUsersCog, FaUniversity, FaClipboardList } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AdminDashboard = ({ token }) => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalScholarships: 0,
    totalApplications: 0,
  });
  const [users, setUsers] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeSection, setActiveSection] = useState("stats");
  const axiosSecure = useAxiosSecure();

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, scholarshipsRes, applicationsRes] = await Promise.all([
          axiosSecure.get("/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axiosSecure.get("/all-scholarships"),
          axiosSecure.get("/applications", {
            headers: { Authorization: `Bearer ${token}` },
          }),
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
        console.error(err);
      }
    };

    fetchData();
  }, [token, axiosSecure]);

  // Handle scroll to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["stats", "users", "scholarships", "applications"];
      for (let sec of sections) {
        const element = document.getElementById(sec);
        if (element) {
          const top = element.getBoundingClientRect().top;
          if (top <= 150) {
            setActiveSection(sec);
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClasses = (section) =>
    `flex items-center gap-2 px-3 py-2 rounded-md transition text-center ${
      activeSection === section
        ? "bg-primary text-white"
        : "text-gray-700 hover:text-primary"
    }`;

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main className="space-y-6 p-6">
        <h1 className="text-center text-2xl font-bold mb-2 text-primary">
          Stats
        </h1>
        {/* Stats Section */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-gray-500">Users</p>
            <p className="text-2xl font-bold">{stats.totalUsers}</p>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-gray-500">Scholarships</p>
            <p className="text-2xl font-bold">{stats.totalScholarships}</p>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-gray-500">Applications</p>
            <p className="text-2xl font-bold">{stats.totalApplications}</p>
          </div>
        </section>
        {/* Users Table */}
        <h1 className="text-center text-2xl font-bold mb-2 text-primary">
          Users
        </h1>
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Array.isArray(users) &&
                users.map((u) => (
                  <tr key={u._id}>
                    <td className="px-6 py-4">{u.name}</td>
                    <td className="px-6 py-4">{u.email}</td>
                    <td className="px-6 py-4">{u.role}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Scholarships Table */}
        <h1 className="text-center text-2xl font-bold mb-2 text-primary">
          Scholarships
        </h1>
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  University
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Array.isArray(scholarships) &&
                scholarships.map((s) => (
                  <tr key={s._id}>
                    <td className="px-6 py-4">{s.scholarshipName}</td>
                    <td className="px-6 py-4">{s.universityName}</td>
                    <td className="px-6 py-4">{s.scholarshipCategory}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Applications Table */}
        <h1 className="text-center text-2xl font-bold mb-2 text-primary">
          Stats
        </h1>
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Scholarship
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applications
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Array.isArray(applications) &&
                applications.map((a) => (
                  <tr key={a._id}>
                    <td className="px-6 py-4">{a.studentName}</td>
                    <td className="px-6 py-4">{a.scholarshipName}</td>
                    <td className="px-6 py-4">{a.applicationStatus}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
