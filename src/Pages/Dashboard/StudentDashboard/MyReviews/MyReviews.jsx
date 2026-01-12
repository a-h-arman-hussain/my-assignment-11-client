import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Loader from "../../../Shared/Loader/Loader";
import EditReview from "../MyReviews/EditReview";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaStar, FaRegCalendarAlt, FaUniversity } from "react-icons/fa";
import Swal from "sweetalert2";
import { FiStar } from "react-icons/fi";

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
    const result = await Swal.fire({
      title: "Delete Review?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--color-error, #f87272)",
      confirmButtonText: "Yes, Delete",
      customClass: { popup: "rounded-[2rem]" },
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/delete-review/${id}`);
        queryClient.invalidateQueries(["myReviews", user?.email]);
        Swal.fire({
          icon: "success",
          title: "Review Removed",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (err) {
        Swal.fire({ icon: "error", title: "Failed to delete" });
      }
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await axiosSecure.patch(`/update-review/${id}`, data);
      queryClient.invalidateQueries(["myReviews", user?.email]);
      setEditingReview(null);
      // Swal.fire({
      //   icon: "success",
      //   title: "Review Updated",
      //   timer: 1500,
      //   showConfirmButton: false,
      // });
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10 pb-10 px-4 md:px-0"
    >
      {/* User Dashboard Header - My Reviews */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 pb-6 border-b border-base-200">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-1"
        >
          {/* ১. সাব-টাইটেল ইন্ডিকেটর: কমিউনিটি ফোকাসড */}
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse"></div>
            <span className="text-primary font-black tracking-[0.3em] uppercase text-[9px] md:text-[10px]">
              Feedback History
            </span>
          </div>

          {/* ২. মেইন টাইটেল - Standardized Typography (font-black + tracking-tighter) */}
          <h1 className="text-3xl md:text-5xl font-black text-base-content uppercase tracking-tighter leading-none">
            My <span className="text-primary">Reviews</span>
          </h1>

          {/* ৩. ডেসক্রিপশন: থিম ফ্রেন্ডলি অপাসিটি */}
          <p className="text-[10px] md:text-xs font-bold opacity-40 uppercase tracking-[0.2em] md:tracking-[0.3em] mt-3 ml-1">
            Share your experience and help the student community
          </p>
        </motion.div>

        {/* ৪. ডাইনামিক কাউন্টার ব্যাজ (ঐচ্ছিক কিন্তু সুন্দর) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-base-200/50 px-5 py-3 rounded-[1.5rem] border border-base-300 flex items-center gap-3 self-start md:self-center"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
            <FiStar className="text-sm fill-current" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest opacity-60 text-base-content">
            {reviews.length} Feedbacks Given
          </span>
        </motion.div>
      </header>

      {/* রিভিউ কার্ড গ্রিড */}
      {reviews.length === 0 ? (
        <div className="bg-base-100 rounded-[2.5rem] p-20 text-center border border-dashed border-base-300">
          <p className="font-bold opacity-30">
            You haven't shared any reviews yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {reviews.map((rev) => (
              <motion.div
                layout
                key={rev._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-base-100 rounded-[2rem] p-6 shadow-xl hover:shadow-2xl border border-base-200 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* ইউনিভার্সিটি ও ডেট */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2 text-primary">
                      <FaUniversity size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest truncate max-w-[120px]">
                        {rev.universityName}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 opacity-40 text-[9px] font-bold">
                      <FaRegCalendarAlt />
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  {/* স্কলারশিপ নাম ও রেটিং */}
                  <h3 className="font-black text-neutral leading-tight mb-2 uppercase text-sm">
                    {rev.scholarshipName}
                  </h3>

                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={12}
                        className={
                          i < rev.rating ? "text-warning" : "text-base-300"
                        }
                      />
                    ))}
                  </div>

                  {/* কমেন্ট সেকশন */}
                  <div className="bg-base-200/50 p-4 rounded-2xl relative">
                    <p className="text-xs font-medium italic text-neutral opacity-80 leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>
                </div>

                {/* অ্যাকশন বাটন */}
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setEditingReview(rev)}
                    className="flex-1 flex items-center justify-center gap-2 bg-warning/10 text-warning py-3 rounded-xl font-black text-[10px] uppercase hover:bg-warning hover:text-white transition-all shadow-sm"
                  >
                    <CiEdit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(rev._id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-error/10 text-error py-3 rounded-xl font-black text-[10px] uppercase hover:bg-error hover:text-white transition-all shadow-sm"
                  >
                    <MdOutlineDeleteForever size={16} /> Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Edit Review Modal */}
      {editingReview && (
        <EditReview
          review={editingReview}
          closeModal={() => setEditingReview(null)}
          onSubmit={handleUpdate}
        />
      )}
    </motion.div>
  );
};

export default MyReviews;
