import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

export default function AllReviews() {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);

  // Load all reviews
  const fetchReviews = async () => {
    try {
      const res = await axiosSecure.get("/reviews");
      setReviews(res.data);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Delete review
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (!confirm) return;

    try {
      const res = await axiosSecure.delete(`/reviews/${id}`);
      if (res.data.deletedCount > 0) {
        alert("Review deleted!");
        fetchReviews();
      } else {
        alert("Failed to delete!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete!");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-base-200 text-neutral">
      <h1 className="text-3xl font-bold mb-6 text-primary text-center">
        All Reviews
      </h1>

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow border border-base-300 p-4">
        <table className="table table-zebra w-full">
          <thead className="bg-base-300 text-neutral font-semibold">
            <tr>
              <th>Student</th>
              <th>Scholarship</th>
              <th>Rating</th>
              <th>Review</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {reviews.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted py-6">
                  No reviews found
                </td>
              </tr>
            ) : (
              reviews.map((review) => (
                <tr key={review._id}>
                  <td>{review.studentName}</td>
                  <td>{review.scholarshipName}</td>
                  <td>{review.rating} ⭐</td>
                  <td className="max-w-xs truncate">{review.comment}</td>
                  <td className="text-center">
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
