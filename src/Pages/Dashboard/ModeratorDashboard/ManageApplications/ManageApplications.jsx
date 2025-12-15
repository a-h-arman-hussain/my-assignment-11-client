import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loader from "../../../Shared/Loader/Loader";
import ApplicationDetailsModal from "./ApplicationDetailsModal";
import FeedbackModal from "./FeedbackModal";
import { IoInformationCircleSharp } from "react-icons/io5";
import { MdCancel, MdFeedback } from "react-icons/md";
import Swal from "sweetalert2";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedApp, setSelectedApp] = useState(null);
  const [feedbackApp, setFeedbackApp] = useState(null);

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["allApplications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  const handleStatusUpdate = async (id, newStatus) => {

    try {
      await axiosSecure.patch(`/applications/${id}`, { status: newStatus });

      Swal.fire({
        icon: "success",
        title: "Status Updated!",
        text: `Application status changed to "${newStatus}".`,
        timer: 1200,
        showConfirmButton: false,
      });

      queryClient.invalidateQueries(["allApplications"]);
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update application status.",
      });
    }
  };

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This application will be rejected!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reject it",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.patch(`/applications/${id}`, {
        applicationStatus: "rejected",
      });

      Swal.fire({
        icon: "success",
        title: "Rejected!",
        text: "Application rejected successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      queryClient.invalidateQueries(["allApplications"]);
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Action Failed",
        text: "Failed to reject application.",
      });
    }
  };

  return (
    <div className="bg-base-200 min-h-screen p-6 rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-primary text-center">
        Manage Applications
      </h1>

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow border border-base-300 p-4">
        <table className="table table-zebra w-full">
          <thead className="bg-base-300 text-neutral font-semibold">
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
                <td colSpan="8" className="text-center text-muted py-6">
                  No applications found
                </td>
              </tr>
            ) : (
              applications.map((app, index) => (
                <tr key={app._id}>
                  <th>{index + 1}</th>
                  <td className="text-neutral">{app.studentName}</td>
                  <td className="text-neutral">{app.studentEmail}</td>
                  <td className="text-neutral">{app.universityName}</td>
                  <td className="text-neutral">
                    {app.feedback || "No feedback"}
                  </td>
                  <td className="text-neutral">{app.applicationStatus}</td>
                  <td className="text-neutral">{app.paymentStatus}</td>
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
                        className="select select-sm select-bordered bg-base-100 text-neutral"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
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
