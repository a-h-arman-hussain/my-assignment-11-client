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
  }, [id, axiosSecure]);

  const handleApply = async () => {
    if (!user) {
      return navigate("/login");
    }

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
    console.log(applicationData);
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

  if (loading) return <Loader></Loader>;
  if (!scholarship)
    return (
      <p className="text-center mt-10 text-red-500">Scholarship not found.</p>
    );

  return (
    <section className="max-w-5xl mx-auto p-6">
      {/* Image */}
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
          <span className="font-semibold">Degree:</span> {scholarship.degree}{" "}
          <br />
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
    </section>
  );
};

export default ScholarshipDetails;
