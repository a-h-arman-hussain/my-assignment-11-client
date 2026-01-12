import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Loader from "../Shared/Loader/Loader";
import Swal from "sweetalert2";
import ReviewCard from "./ReviewCard";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiMapPin,
  FiBook,
  FiDollarSign,
  FiClock,
  FiSend,
} from "react-icons/fi";

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
        Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "Your application has been received.",
          timer: 2000,
          showConfirmButton: false,
          customClass: { popup: "rounded-[2rem]" },
        });
        navigate("/dashboard/my-applications");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong! Please try again.",
        customClass: { popup: "rounded-[2rem]" },
      });
    }
  };

  if (loading) return <Loader />;
  if (!scholarship)
    return (
      <p className="text-center mt-20 font-black uppercase tracking-widest opacity-20">
        Scholarship not found.
      </p>
    );

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-6 md:py-16 space-y-12"
    >
      {/* Hero Section */}
      <div className="relative group">
        <div className="overflow-hidden rounded-[2.5rem] shadow-2xl h-[450px] relative">
          <img
            src={scholarship.universityImage}
            alt={scholarship.universityName}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          <div className="absolute bottom-8 left-8 right-8">
            <span className="bg-primary text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
              {scholarship.scholarshipCategory}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mt-4 uppercase tracking-tighter leading-none">
              {scholarship.scholarshipName}
            </h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-base-100/60 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] border border-base-300 shadow-xl">
            <h2 className="text-2xl font-black text-neutral uppercase tracking-tight mb-6">
              Institution Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <DetailItem
                icon={<FiMapPin />}
                label="Location"
                value={`${scholarship.universityCity}, ${scholarship.universityCountry}`}
              />
              <DetailItem
                icon={<FiBook />}
                label="Degree"
                value={scholarship.degree}
              />
              <DetailItem
                icon={<FiCalendar />}
                label="Subject"
                value={scholarship.subjectCategory}
              />
              <DetailItem
                icon={<FiClock />}
                label="Posted Date"
                value={scholarship.postDate}
              />
            </div>

            <div className="divider opacity-10"></div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-10">
              <StatCard label="Tuition" value={`$${scholarship.tuitionFees}`} />
              <StatCard
                label="App Fee"
                value={`$${scholarship.applicationFees}`}
              />
              <StatCard
                label="Service"
                value={`$${scholarship.serviceCharge}`}
              />
            </div>
          </div>

          {/* Reviews Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-neutral uppercase tracking-tighter flex items-center gap-3">
              <span className="w-10 h-[2px] bg-primary"></span>
              Student Feedback
            </h3>
            {reviews.length === 0 ? (
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-30 p-10 bg-base-200/50 rounded-[2rem] text-center border border-dashed border-base-300">
                No reviews yet for this program
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="lg:sticky lg:top-24 space-y-6">
          <div className="bg-neutral p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -mr-16 -mt-16"></div>

            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">
              Application Deadline
            </p>
            <h4 className="text-3xl font-black mb-6 text-primary">
              {scholarship.deadline}
            </h4>

            <button
              onClick={handleApply}
              className="btn btn-primary w-full h-16 rounded-[1.5rem] font-black uppercase tracking-widest shadow-xl shadow-primary/40 group hover:scale-[1.03] transition-all"
            >
              Apply Now{" "}
              <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>

            <p className="text-[9px] text-center mt-6 font-bold opacity-40 uppercase tracking-widest">
              Secure your future today
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

// Internal Components for cleaner UI
const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40">
        {label}
      </p>
      <p className="text-sm font-black text-neutral mt-1">{value}</p>
    </div>
  </div>
);

const StatCard = ({ label, value }) => (
  <div className="bg-base-200/50 p-6 rounded-[1.5rem] border border-base-300 transition-all hover:bg-white hover:shadow-xl">
    <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 mb-1">
      {label}
    </p>
    <p className="text-xl font-black text-primary">{value}</p>
  </div>
);

export default ScholarshipDetails;
