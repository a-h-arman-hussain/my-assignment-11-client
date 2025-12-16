import React, { useEffect, useState } from "react";
import {
  FaClipboardCheck,
  FaClock,
} from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { MdCheckCircle, MdOutlinePending } from "react-icons/md";

const ModeratorDashboard = () => {
  const axiosSecure = useAxiosSecure();

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
        const res = await axiosSecure.get("/applications", {});

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
      }
    };

    fetchData();
  }, [axiosSecure]);

  return (
    <div className="p-6 space-y-6 min-h-screen bg-base-200">
      {/* Header */}
      <h1 className="text-2xl font-bold text-center text-primary">
        Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow text-center">
          <FaClipboardCheck className="mx-auto text-3xl text-primary" />
          <p className="text-gray-500 mt-1">Total Applications</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>

        <div className="bg-white p-4 rounded shadow text-center">
          <FaClock className="mx-auto text-3xl text-warning" />
          <p className="text-gray-500 mt-1">Pending</p>
          <p className="text-2xl font-bold">{stats.pending}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <MdOutlinePending className="mx-auto text-3xl text-warning" />
          <p className="text-gray-500 mt-1">processing</p>
          <p className="text-2xl font-bold">{stats.processing}</p>
        </div>

        <div className="bg-white p-4 rounded shadow text-center">
          <MdCheckCircle className="mx-auto text-3xl text-secondary" />
          <p className="text-gray-500 mt-1">Completed</p>
          <p className="text-2xl font-bold">{stats.complete}</p>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <h2 className="text-lg font-semibold text-primary p-4 border-b">
          Manage Applications
        </h2>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Student
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Scholarship
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {applications.map((app) => (
              <tr key={app._id}>
                <td className="px-6 py-4">{app.studentName}</td>
                <td className="px-6 py-4">{app.scholarshipName}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      app.applicationStatus === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : app.applicationStatus === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-primary/20 text-primary"
                    }`}
                  >
                    {app.applicationStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModeratorDashboard;
