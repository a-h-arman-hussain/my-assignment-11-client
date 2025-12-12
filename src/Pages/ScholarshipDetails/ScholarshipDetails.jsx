import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
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
  }, [axiosSecure, id]);

  useEffect(() => {
    if (!scholarship?.scholarshipName) return;
    axiosSecure
      .get(`/reviews/${scholarship.scholarshipName}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Failed to load reviews:", err));
  }, [axiosSecure, scholarship?.scholarshipName]);

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
      <p className="text-center mt-10 text-error font-semibold">
        Scholarship not found.
      </p>
    );

  return (
    <section className="max-w-5xl mx-auto p-6 space-y-10">
      {/* Cover Image */}
      <div className="relative rounded-xl overflow-hidden shadow-2xl">
        <img
          src={scholarship.universityImage}
          alt={scholarship.universityName}
          className="w-full h-80 object-cover"
        />
        <span className="absolute top-4 left-4 bg-gradient-to-r from-primary to-secondary text-base-100 px-4 py-1 rounded-full text-sm font-semibold shadow-md">
          {scholarship.scholarshipCategory}
        </span>
      </div>

      {/* Scholarship Info */}
      <div className="bg-base-100 p-6 rounded-xl shadow-lg space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral">
          {scholarship.scholarshipName}
        </h1>

        <p className="text-muted">
          <span className="font-semibold">University:</span>{" "}
          {scholarship.universityName} <br />
          <span className="font-semibold">Location:</span>{" "}
          {scholarship.universityCity}, {scholarship.universityCountry} <br />
          <span className="font-semibold">Degree:</span> {scholarship.degree}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoCard
            label="Tuition Fees"
            value={`$${scholarship.tuitionFees}`}
          />
          <InfoCard
            label="Application Fees"
            value={`$${scholarship.applicationFees}`}
          />
          <InfoCard
            label="Service Charge"
            value={`$${scholarship.serviceCharge}`}
          />
          <InfoCard label="Deadline" value={scholarship.applicationDeadline} />
        </div>

        <p className="text-muted">
          <span className="font-semibold">Posted On:</span>{" "}
          {scholarship.scholarshipPostDate}
        </p>

        <button
          onClick={handleApply}
          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-base-100 p-3 rounded-lg font-semibold transition shadow-lg"
        >
          Apply Now
        </button>
      </div>

      {/* Reviews */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-neutral">Student Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-muted">No reviews for this scholarship yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ScholarshipDetails;

// InfoCard Component
const InfoCard = ({ label, value }) => (
  <div className="bg-base-200 p-4 rounded-lg shadow-inner hover:shadow-lg transition">
    <p className="text-neutral">
      <span className="font-semibold">{label}:</span> {value}
    </p>
  </div>
);

// ReviewCard Component
const ReviewCard = ({ review }) => (
  <div className="p-5 border rounded-lg shadow-md bg-base-100 flex gap-4 hover:shadow-xl transition">
    <img
      src={review.reviewerImage || "https://i.ibb.co/4pDNd9p/avatar.png"}
      alt="avatar"
      className="w-14 h-14 rounded-full"
    />
    <div className="flex-1 space-y-1">
      <div className="flex items-center justify-between">
        <h3 className="text-neutral font-semibold">{review.studentName}</h3>
        <span className="text-warning font-bold">⭐ {review.rating}</span>
      </div>
      <p className="text-muted text-sm">
        {new Date(review.createdAt).toLocaleDateString()}
      </p>
      <p className="text-neutral">{review.comment}</p>
    </div>
  </div>
);
