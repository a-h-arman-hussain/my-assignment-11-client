import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Loader from "../Shared/Loader/Loader";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  // ✅ Load Scholarship Details
  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const res = await axiosSecure.get(`/scholarship-details/${id}`);
        setScholarship(res.data);
      } catch (err) {
        console.error("Error fetching scholarship:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchScholarship();
  }, [id]);

  // ✅ Load Reviews only when scholarshipName is available
  useEffect(() => {
    if (!scholarship?.scholarshipName) return;

    axiosSecure
      .get(`/reviews/${scholarship.scholarshipName}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Failed to load reviews:", err));
  }, [scholarship?.scholarshipName]);

  // Apply button handler
  const handleApply = async () => {
    if (!user) return navigate("/login");

    const { _id, ...scholarshipData } = scholarship;

    const applicationData = {
      scholarshipId: _id,
      ...scholarshipData,
      studentEmail: user.email,
      studentName: user.displayName,
      appliedAt: new Date(),
      paymentStatus: "pending",
      applicationStatus: "pending",
    };

    try {
      const res = await axiosSecure.post(
        "/apply-scholarships",
        applicationData
      );

      if (res.data.success) {
        alert("Application submitted successfully!");
        navigate("/dashboard/my-applications");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  if (loading) return <Loader />;
  if (!scholarship)
    return (
      <p className="text-center mt-10 text-red-500">Scholarship not found.</p>
    );

  return (
    <section className="max-w-5xl mx-auto p-6">
      {/* Cover Image */}
      <div className="relative rounded-xl overflow-hidden shadow-2xl mb-8">
        <img
          src={scholarship.universityImage}
          alt={scholarship.universityName}
          className="w-full h-80 object-cover"
        />
        <span className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
          {scholarship.scholarshipCategory}
        </span>
      </div>

      {/* Scholarship Info */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          {scholarship.scholarshipName}
        </h1>

        <p className="text-gray-300 mb-6">
          <span className="font-semibold">University:</span>{" "}
          {scholarship.universityName} <br />
          <span className="font-semibold">Location:</span>{" "}
          {scholarship.universityCity}, {scholarship.universityCountry} <br />
          <span className="font-semibold">Degree:</span> {scholarship.degree}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-lg shadow-inner">
            <p className="text-gray-300">
              <span className="font-semibold">Tuition Fees:</span> $
              {scholarship.tuitionFees}
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-inner">
            <p className="text-gray-300">
              <span className="font-semibold">Application Fees:</span> $
              {scholarship.applicationFees}
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-inner">
            <p className="text-gray-300">
              <span className="font-semibold">Service Charge:</span> $
              {scholarship.serviceCharge}
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-inner">
            <p className="text-gray-300">
              <span className="font-semibold">Deadline:</span>{" "}
              {scholarship.applicationDeadline}
            </p>
          </div>
        </div>

        <p className="text-gray-400 mb-6">
          <span className="font-semibold">Posted On:</span>{" "}
          {scholarship.scholarshipPostDate}
        </p>

        <button
          onClick={handleApply}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white p-3 rounded-lg font-semibold transition shadow-lg cursor-pointer"
        >
          Apply Now
        </button>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Student Reviews</h2>

        {reviews.length === 0 && (
          <p className="text-gray-500">No reviews for this scholarship yet.</p>
        )}

        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="p-5 border rounded-lg shadow-md bg-white flex gap-4"
            >
              <img
                src={
                  review.reviewerImage || "https://i.ibb.co/4pDNd9p/avatar.png"
                }
                alt="avatar"
                className="w-14 h-14 rounded-full"
              />

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    {review.studentName}
                  </h3>
                  <span className="text-yellow-500 font-bold">
                    ⭐ {review.rating}
                  </span>
                </div>

                <p className="text-gray-500 text-sm">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>

                <p className="mt-2 text-gray-700">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScholarshipDetails;
