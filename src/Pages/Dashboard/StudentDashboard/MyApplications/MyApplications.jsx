import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Loader from "../../../Shared/Loader/Loader";
import MyApplicationDetails from "./MyApplicationDetails";
import EditMyApplication from "./EditMyApplication";
import AddReview from "../MyReviews/AddReview";
import { IoInformationCircleSharp } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import {
  MdOutlineDeleteForever,
  MdOutlinePayment,
  MdPreview,
} from "react-icons/md";

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedApp, setSelectedApp] = useState(null);
  const [updatingApp, setUpdatingApp] = useState(null);
  const [reviewingApp, setReviewingApp] = useState(null);

  // Fetch user's applications
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["myApplications", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/my-applications?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleUpdate = async (id, data) => {
    try {
      await axiosSecure.patch(`/update-application/${id}`, data);
      alert("Application updated successfully!");
      queryClient.invalidateQueries(["myApplications", user?.email]);
      setUpdatingApp(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update application");
    }
  };

  const handlePayment = async (app) => {
    const paymentInfo = {
      applicationFees: app.applicationFees,
      scholarshipId: app.scholarshipId,
      email: user.email,
      scholarshipName: app.scholarshipName,
    };
    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo
    );
    window.location.assign(res.data.url);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?"))
      return;

    try {
      await axiosSecure.delete(`/delete-application/${id}`);
      alert("Application deleted successfully!");
      queryClient.invalidateQueries(["myApplications", user?.email]);
    } catch (err) {
      console.error(err);
      alert("Failed to delete application");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Applications</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>University Name</th>
              <th>University Address</th>
              <th>Feedback</th>
              <th>Subject Category</th>
              <th>Application Fees</th>
              <th>Application Status</th>
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
                  <td>{app.universityName}</td>
                  <td>{app.universityCity}</td>
                  <td>{app.feedback || "-"}</td>
                  <td>{app.subjectCategory}</td>
                  <td>${app.applicationFees}</td>
                  <td
                    className={
                      app.applicationStatus === "completed"
                        ? "text-green-500"
                        : app.applicationStatus === "pending"
                        ? "text-yellow-500"
                        : app.applicationStatus === 'processing' ? "text-gray-500" : 'text-red-500'
                    }
                  >
                    {app.applicationStatus}
                  </td>
                  <td className="flex flex-wrap gap-2 justify-center">
                    {/* DETAILS */}
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="btn btn-sm btn-info text-white"
                    >
                      <IoInformationCircleSharp size={22} />
                    </button>

                    {/* EDIT */}
                    {app.applicationStatus === "pending" && (
                      <button
                        onClick={() => setUpdatingApp(app)}
                        className="btn btn-sm btn-warning text-white"
                      >
                        <CiEdit size={22} />
                      </button>
                    )}

                    {/* PAY */}
                    {app.paymentStatus !== "paid" && (
                      <button
                        onClick={() => handlePayment(app)}
                        className="btn btn-sm btn-success text-white"
                      >
                        <MdOutlinePayment size={22} />
                      </button>
                    )}

                    {/* DELETE */}
                    {app.applicationStatus === "pending" && (
                      <button
                        onClick={() => handleDelete(app._id)}
                        className="btn btn-sm btn-error text-white"
                      >
                        <MdOutlineDeleteForever size={22} />
                      </button>
                    )}

                    {/* ADD REVIEW */}
                    {app.applicationStatus === "completed" && (
                      <button
                        onClick={() => setReviewingApp(app)}
                        className="btn btn-sm btn-primary text-white"
                      >
                        <MdPreview size={22} />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODALS */}
      {selectedApp && (
        <MyApplicationDetails
          application={selectedApp}
          closeModal={() => setSelectedApp(null)}
        />
      )}

      {updatingApp && (
        <EditMyApplication
          application={updatingApp}
          closeModal={() => setUpdatingApp(null)}
          onUpdate={handleUpdate}
        />
      )}

      {/* Add Review Modal Placeholder */}
      {reviewingApp && (
        <AddReview
          application={reviewingApp}
          closeModal={() => setReviewingApp(null)}
        />
      )}
    </div>
  );
};

export default MyApplications;
