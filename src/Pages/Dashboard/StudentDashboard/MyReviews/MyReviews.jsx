// MyReviews.jsx
import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Loader from "../../../Shared/Loader/Loader";
import EditReview from "../MyReviews/EditReview";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteForever } from "react-icons/md";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [editingReview, setEditingReview] = useState(null);

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["myReviews", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/my-reviews?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await axiosSecure.delete(`/delete-review/${id}`);
      alert("Review deleted successfully!");
      queryClient.invalidateQueries(["myReviews", user?.email]);
    } catch (err) {
      console.error(err);
      alert("Failed to delete review");
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await axiosSecure.patch(`/update-review/${id}`, data);
      alert("Review updated successfully!");
      queryClient.invalidateQueries(["myReviews", user?.email]);
      setEditingReview(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update review");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-6 bg-base-200 min-h-screen rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-primary text-center">
        My Reviews
      </h1>

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow border border-base-300 p-4">
        <table className="table table-zebra w-full">
          <thead className="bg-base-300 text-neutral font-semibold">
            <tr>
              <th>#</th>
              <th>Scholarship</th>
              <th>University</th>
              <th>Comment</th>
              <th>Rating</th>
              <th>Review Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-muted py-6">
                  No reviews found.
                </td>
              </tr>
            ) : (
              reviews.map((rev, index) => (
                <tr key={rev._id}>
                  <th>{index + 1}</th>
                  <td>{rev.scholarshipName}</td>
                  <td>{rev.universityName}</td>
                  <td>{rev.comment}</td>
                  <td>{rev.rating} ★</td>
                  <td>{new Date(rev.createdAt).toLocaleDateString()}</td>
                  <td className="flex gap-2 justify-center">
                    <button
                      onClick={() => setEditingReview(rev)}
                      className="btn btn-sm btn-warning text-white"
                    >
                      <CiEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(rev._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      <MdOutlineDeleteForever size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Review Modal */}
      {editingReview && (
        <EditReview
          review={editingReview}
          closeModal={() => setEditingReview(null)}
          onSubmit={handleUpdate}
        />
      )}
    </div>
  );
};

export default MyReviews;
