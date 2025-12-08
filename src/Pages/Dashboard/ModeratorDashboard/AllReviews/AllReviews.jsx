import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

export default function AllReviews() {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);

  // Load all reviews
  const fetchReviews = async () => {
    const res = await axiosSecure.get("/reviews");
    setReviews(res.data);
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

    const res = await axiosSecure.delete(`/reviews/${id}`);

    if (res.data.deletedCount > 0) {
      alert("Review deleted!");
      fetchReviews();
    } else {
      alert("Failed to delete!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">All Reviews</h1>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Student</th>
              <th>Scholarship</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((review) => (
              <tr key={review._id}>
                {console.log(review)}
                <td>{review.studentName}</td>
                <td>{review.scholarshipName}</td>
                <td>{review.rating} ⭐</td>
                <td className="max-w-xs truncate">{review.comment}</td>

                <td>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}

            {reviews.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  No reviews found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
