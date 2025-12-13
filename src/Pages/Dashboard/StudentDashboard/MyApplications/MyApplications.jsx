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
import { a } from "framer-motion/client";

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedApp, setSelectedApp] = useState(null);
  const [updatingApp, setUpdatingApp] = useState(null);
  const [reviewingApp, setReviewingApp] = useState(null);

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

  // const handlePayment = async (app) => {
  //   const paymentInfo = {
  //     applicationFees: app.applicationFees,
  //     scholarshipId: app.scholarshipId,
  //     email: user.email,
  //     scholarshipName: app.scholarshipName,
  //   };
  //   const res = await axiosSecure.post(
  //     "/payment-checkout-session",
  //     paymentInfo
  //   );
  //   window.location.assign(res.data.url);
  // };

  const handlePayment = async (app) => {
    try {
      const paymentPayload = {
        applicationId: app._id,
        scholarshipId: app.scholarshipId,
        scholarshipName: app.scholarshipName,
        universityName: app.universityName,
        amount: Number(app.applicationFees),
        userEmail: app.userEmail,
        studentEmail: app.studentEmail,
        studentName: app.studentName,
      };

      const res = await axiosSecure.post("/payments/init", paymentPayload);

      window.location.assign(res.data.url);
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
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
    <div className="min-h-screen p-6 bg-base-200 text-neutral">
      <h1 className="text-3xl font-bold mb-6 text-primary text-center">
        My Applications
      </h1>

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow border border-base-300 p-4">
        <table className="table table-zebra w-full">
          <thead className="bg-base-300 text-neutral font-semibold">
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
                <td colSpan="8" className="text-center text-muted">
                  No applications found.
                </td>
              </tr>
            ) : (
              applications.map((app, index) => (
                <tr key={app._id}>
                  <th>{index + 1}</th>
                  <td className="text-neutral">{app.universityName}</td>
                  <td className="text-neutral">{app.universityCity}</td>
                  <td className="text-neutral">{app.feedback || "-"}</td>
                  <td className="text-neutral">{app.subjectCategory}</td>
                  <td className="text-neutral">${app.applicationFees}</td>
                  <td
                    className={`font-medium ${
                      app.applicationStatus === "completed"
                        ? "text-green-500"
                        : app.applicationStatus === "pending"
                        ? "text-yellow-500"
                        : app.applicationStatus === "processing"
                        ? "text-gray-500"
                        : "text-red-500"
                    }`}
                  >
                    {app.applicationStatus}
                  </td>
                  <td className="flex gap-2 justify-center flex-wrap">
                    {/* DETAILS */}
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="btn btn-sm btn-info text-white"
                    >
                      <IoInformationCircleSharp size={20} />
                    </button>

                    {/* EDIT */}
                    {app.applicationStatus === "pending" && (
                      <button
                        onClick={() => setUpdatingApp(app)}
                        className="btn btn-sm btn-warning text-white"
                      >
                        <CiEdit size={20} />
                      </button>
                    )}

                    {/* PAY */}
                    {app.paymentStatus !== "paid" && (
                      <button
                        onClick={() => handlePayment(app)}
                        className="btn btn-sm btn-success text-white"
                      >
                        <MdOutlinePayment size={20} />
                      </button>
                    )}

                    {/* DELETE */}
                    {app.applicationStatus === "pending" && (
                      <button
                        onClick={() => handleDelete(app._id)}
                        className="btn btn-sm btn-error text-white"
                      >
                        <MdOutlineDeleteForever size={20} />
                      </button>
                    )}

                    {/* ADD REVIEW */}
                    {app.applicationStatus === "completed" && (
                      <button
                        onClick={() => setReviewingApp(app)}
                        className="btn btn-sm btn-primary text-white"
                      >
                        <MdPreview size={20} />
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
