import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiTrash2, FiStar, FiMessageSquare, FiUser } from "react-icons/fi";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loader from "../../../Shared/Loader/Loader";

export default function AllReviews() {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/reviews");
      setReviews(res.data);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444", // Error color
      cancelButtonColor: "#1F2937", // Neutral color
      confirmButtonText: "Yes, delete it!",
      customClass: { popup: "rounded-[2rem]" },
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/reviews/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          timer: 1500,
          showConfirmButton: false,
          customClass: { popup: "rounded-[2rem]" },
        });
        fetchReviews();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-8 min-h-screen"
    >
      {/* Dashboard Page Header - Manage Reviews */}
      <header className="mb-12 pb-6 border-b border-base-200">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          {/* ১. সাব-টাইটেল ইন্ডিকেটর */}
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-primary/40"></div>
            <span className="text-primary font-black tracking-[0.3em] uppercase text-[10px]">
              Moderation Panel
            </span>
          </div>

          {/* ২. মেইন টাইটেল - Standardized Typography (font-black + tracking-tighter) */}
          <h1 className="text-3xl md:text-5xl font-black text-base-content uppercase tracking-tighter leading-none">
            Manage <span className="text-primary">Reviews</span>
          </h1>

          {/* ৩. ডেসক্রিপশন: গ্লোবাল অপাসিটি এবং ট্র্যাকিং */}
          <p className="text-[10px] md:text-xs font-bold opacity-40 uppercase tracking-[0.2em] md:tracking-[0.3em] mt-3 ml-1">
            Monitor, moderate, and analyze all student feedback
          </p>
        </motion.div>
      </header>

      {/* Main Table Container */}
      <div className="bg-base-100 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-base-300 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-0">
            {/* Table Head */}
            <thead>
              <tr className="bg-base-200/60">
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral opacity-60 border-none">
                  Student Info
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral opacity-60 border-none">
                  Scholarship
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral opacity-60 border-none">
                  Rating & Feedback
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral opacity-60 border-none text-center">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {reviews.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-20">
                    <div className="flex flex-col items-center opacity-20">
                      <FiMessageSquare size={48} />
                      <p className="mt-4 font-black uppercase tracking-widest text-xs">
                        No Reviews Found
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                reviews.map((review) => (
                  <tr
                    key={review._id}
                    className="hover:bg-base-200/30 transition-colors"
                  >
                    {/* Student Column */}
                    <td className="p-6 border-b border-base-200">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-primary/20 bg-base-300">
                          {review.studentImage ? (
                            <img
                              src={review.studentImage}
                              alt={review.studentName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-primary">
                              <FiUser size={20} />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-black text-sm text-neutral">
                            {review.studentName}
                          </p>
                          <p className="text-[10px] font-bold opacity-40">
                            {review.studentEmail}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Scholarship Column */}
                    <td className="p-6 border-b border-base-200">
                      <p className="font-bold text-sm text-primary uppercase tracking-tighter">
                        {review.scholarshipName}
                      </p>
                      <p className="text-[10px] font-black opacity-30 uppercase">
                        {review.universityName}
                      </p>
                    </td>

                    {/* Rating & Review Column */}
                    <td className="p-6 border-b border-base-200 max-w-md">
                      <div className="flex items-center gap-1 text-warning mb-1">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            size={14}
                            className={
                              i < review.rating
                                ? "fill-warning"
                                : "text-base-300"
                            }
                          />
                        ))}
                      </div>
                      <p className="text-xs font-bold text-neutral opacity-70 italic line-clamp-2">
                        "{review.comment}"
                      </p>
                    </td>

                    {/* Action Column */}
                    <td className="p-6 border-b border-base-200 text-center">
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="group p-4 bg-error/10 hover:bg-error text-error hover:text-white rounded-2xl transition-all duration-300 active:scale-90"
                        title="Delete Review"
                      >
                        <FiTrash2
                          size={20}
                          className="group-hover:rotate-12 transition-transform"
                        />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
