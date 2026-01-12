import React from "react";
import { FiStar } from "react-icons/fi";
import { motion } from "framer-motion";

const ReviewCard = ({ review }) => {
  // রেটিং অনুযায়ী স্টারের সংখ্যা দেখানোর লজিক
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FiStar
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "fill-warning text-warning" : "text-base-300"
        }`}
      />
    ));
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-3 rounded-[2.5rem] shadow-xl border border-base-300 flex flex-col sm:flex-row gap-5 hover:shadow-2xl transition-all duration-300 group"
    >
      {/* রিভিউয়ার ইমেজ - গ্লোবাল ইউনিফর্ম স্টাইল */}
      <div className="shrink-0">
        <div className="w-16 h-16 rounded-2xl overflow-hidden ring-4 ring-primary/10 group-hover:ring-primary/20 transition-all">
          <img
            src={review.reviewerImage}
            alt={review.studentName}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* কন্টেন্ট সেকশন */}
      <div className="flex-1 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-black text-neutral leading-none group-hover:text-primary transition-colors">
              {review.studentName}
            </h3>
            <p className="text-[11px] font-bold uppercase tracking-widest opacity-40 mt-1">
              {new Date(
                review.reviewDate || review.createdAt
              ).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>

          {/* রেটিং - স্টাইলিশ ব্যাজ */}
          <div className="flex items-center gap-1.5 bg-warning/10 px-3 py-1 rounded-full">
            <div className="flex">{renderStars(review.rating)}</div>
            <span className="text-warning font-black text-xs">
              {review.rating}
            </span>
          </div>
        </div>

        {/* কমেন্ট */}
        <p className="text-base-content/70 text-sm italic leading-relaxed">
          "{review.comment}"
        </p>

        {/* অপশনাল: স্কলারশিপের নাম ছোট করে নিচে দেওয়া যেতে পারে */}
        <div className="pt-2">
          <span className="text-[10px] bg-secondary/10 text-secondary px-2 py-0.5 rounded-md font-bold uppercase">
            Verified Review
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
