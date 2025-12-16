import React, { useEffect, useState } from "react";
import { FaClipboardList, FaCheckCircle, FaClock } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const StudentDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  });

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
        setApplications(apps);

        setStats({
          total: apps.length,
          completed: apps.filter((a) => a.applicationStatus === "completed")
            .length,
          pending: apps.filter(
            (a) => !a.applicationStatus || a.applicationStatus === "pending"
          ).length,
        });

        setReviews(reviewsRes.data || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err.response?.data || err);
      }
    };

    fetchData();
  }, [axiosSecure, user]);

  return (
    <div className="p-6 space-y-6 min-h-screen bg-base-200">
      <h1 className="text-2xl font-bold text-center text-primary">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow text-center">
          <FaClipboardList className="mx-auto text-3xl text-primary" />
          <p className="text-gray-500 mt-2">Total Applications</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>

        <div className="bg-white p-4 rounded shadow text-center">
          <FaCheckCircle className="mx-auto text-3xl text-green-600" />
          <p className="text-gray-500 mt-2">completed</p>
          <p className="text-2xl font-bold">{stats.completed}</p>
        </div>

        <div className="bg-white p-4 rounded shadow text-center">
          <FaClock className="mx-auto text-3xl text-yellow-500" />
          <p className="text-gray-500 mt-2">Pending</p>
          <p className="text-2xl font-bold">{stats.pending}</p>
        </div>
      </div>

      {/* My Applications */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <h2 className="text-lg font-semibold p-4 border-b text-primary">My Applications</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Scholarship
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                University
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Applied At
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {applications.map((app) => (
              <tr className="text-sm" key={app.scholarshipId}>
                <td className="px-6 py-4 text-blue-500 font-semibold">{app.scholarshipName}</td>
                <td className="px-6 py-4">{app.universityName}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      app.applicationStatus === "completed"
                        ? "bg-green-100 text-green-700"
                        : app.applicationStatus === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {app.applicationStatus || "pending"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {new Date(app.appliedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* My Reviews */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <h2 className="text-lg font-semibold p-4 border-b text-primary">My Reviews</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Scholarship
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Comment
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reviews.map((r) => (
              <tr className="text-sm" key={r._id}>
                <td className="px-6 py-4 text-blue-500 font-semibold">{r.scholarshipName}</td>
                <td className="px-6 py-4">⭐ {r.rating}</td>
                <td className="px-6 py-4">{r.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDashboard;
