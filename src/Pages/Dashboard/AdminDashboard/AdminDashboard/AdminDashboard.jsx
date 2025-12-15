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
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, scholarshipsRes, applicationsRes] = await Promise.all([
          axiosSecure.get("/users", {}),
          axiosSecure.get("/all-scholarships"),
          axiosSecure.get("/applications", {}),
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
                    <td className="px-6 py-4 text-primary font-semibold">
                      {u.name}
                    </td>
                    <td className="px-6 py-4">{u.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-white px-2 py-0.5 text-sm font-semibold rounded-lg ${
                          u.role === "Moderator" ? "bg-primary" : "bg-blue-500"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
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
          Applications
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
