import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loader from "../../../Shared/Loader/Loader";
import ApplicationDetailsModal from "./ApplicationDetailsModal";
import FeedbackModal from "./FeedbackModal";
import { IoInformationCircleSharp } from "react-icons/io5";
import { MdCancel, MdFeedback } from "react-icons/md";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedApp, setSelectedApp] = useState(null);
  const [feedbackApp, setFeedbackApp] = useState(null);

  // Fetch all student applications
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["allApplications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications"); // backend route
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/applications/${id}/status`, {
        status: newStatus,
      });
      queryClient.invalidateQueries(["allApplications"]);
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to reject this application?"))
      return;
    try {
      await axiosSecure.patch(`/applications/${id}/status`, {
        status: "rejected",
      });
      queryClient.invalidateQueries(["allApplications"]);
    } catch (err) {
      console.error(err);
      alert("Failed to reject application");
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Applied Applications</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Applicant Name</th>
              <th>Email</th>
              <th>University</th>
              <th>Feedback</th>
              <th>Application Status</th>
              <th>Payment Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center text-gray-500">
                  No applications found.
                </td>
              </tr>
            ) : (
              applications.map((app, index) => (
                <tr key={app._id}>
                  <th>{index + 1}</th>
                  <td>{app.studentName}</td>
                  <td>{app.studentEmail}</td>
                  <td>{app.universityName}</td>
                  <td>{app.feedback || "No feedback"}</td>
                  <td>{app.applicationStatus}</td>
                  <td>{app.paymentStatus}</td>
                  <td className="text-center">
                    <div className="inline-flex gap-2 justify-center">
                      <button
                        className="btn btn-sm btn-info text-white"
                        onClick={() => setSelectedApp(app)}
                      >
                        <IoInformationCircleSharp size={20} />
                      </button>
                      <button
                        className="btn btn-sm btn-primary text-white"
                        onClick={() => setFeedbackApp(app)}
                      >
                        <MdFeedback size={20} />
                      </button>
                      <select
                        value={app.applicationStatus}
                        onChange={(e) =>
                          handleStatusUpdate(app._id, e.target.value)
                        }
                        className="select select-sm border border-green-500 text-green-500"
                      >
                        <option className="text-amber-500" value="pending">Pending</option>
                        <option className="text-blue-500" value="processing">Processing</option>
                        <option value="completed">Completed</option>
                      </select>
                      <button
                        className="btn btn-sm btn-error text-white"
                        onClick={() => handleCancel(app._id)}
                      >
                        <MdCancel size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {selectedApp && (
        <ApplicationDetailsModal
          application={selectedApp}
          closeModal={() => setSelectedApp(null)}
        />
      )}
      {feedbackApp && (
        <FeedbackModal
          application={feedbackApp}
          closeModal={() => setFeedbackApp(null)}
        />
      )}
    </div>
  );
};

export default ManageApplications;
