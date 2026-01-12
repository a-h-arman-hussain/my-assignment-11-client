import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ScholarshipCard from "../../AllScholarships/ScholarshipCard";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

const LatestScholarships = () => {
  const [latestScholarships, setLatestScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  // Skeleton Card Component for Loading State
  const SkeletonCard = () => (
    <div className="bg-base-100 rounded-2xl p-4 shadow-md border border-base-200 animate-pulse">
      <div className="w-full h-48 bg-base-300 rounded-xl mb-4"></div>
      <div className="h-6 bg-base-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-base-300 rounded w-full mb-4"></div>
      <div className="flex justify-between items-center">
        <div className="h-5 bg-base-300 rounded w-1/4"></div>
        <div className="h-8 bg-base-300 rounded w-1/3"></div>
      </div>
    </div>
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await axiosSecure.get("/latest-scholarships");
        setLatestScholarships(res.data);
      } catch (err) {
        console.error("Failed to fetch latest scholarships:", err);
      } finally {
        // রিয়েলিস্টিক ফিল দেওয়ার জন্য সামান্য ডিলে রাখা যেতে পারে
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchLatest();
  }, [axiosSecure]);

  return (
    <section className="mt-10 md:mt-16">
      <div className="container mx-auto">
        {/* Standard Header Section - এই স্ট্রাকচার সব পেজে ব্যবহার করুন */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-left"
          >
            {/* সাব-টাইটেল: প্রাইমারি কালার ব্যবহার করা হয়েছে */}
            <span className="text-primary font-black tracking-[0.3em] uppercase text-[10px]">
              Opportunities
            </span>

            {/* মেইন টাইটেল: বেস-কন্টেন্ট (থিম অনুযায়ী সাদা/কালো হবে) এবং প্রাইমারি হাইলাইট */}
            <h2 className="text-3xl md:text-5xl font-black mt-2 uppercase tracking-tighter text-base-content">
              Latest <span className="text-primary">Scholarships</span>
            </h2>

            {/* ডেকোরেটিভ বার: প্রাইমারি কালার */}
            <div className="w-16 h-1.5 bg-primary rounded-full mt-4"></div>
          </motion.div>

          {/* অ্যাকশন বাটন: ডাইনামিক আউটলাইন বাটন */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group"
          >
            <Link
              to="/all-scholarships"
              className="btn btn-outline btn-primary rounded-full px-10 font-black uppercase tracking-widest text-[10px]"
            >
              View All
            </Link>
          </motion.button>
        </div>

        {/* Grid Section */}
        {loading ? (
          // রিকোয়ারমেন্ট অনুযায়ী Skeleton Loader
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <SkeletonCard key={n} />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <AnimatePresence>
              {latestScholarships.length > 0 ? (
                latestScholarships.slice(0, 10).map((scholar) => (
                  <motion.div
                    key={scholar._id}
                    variants={itemVariants}
                    whileHover={{ y: -10 }}
                    className="h-full"
                  >
                    <ScholarshipCard scholar={scholar} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-20 bg-base-200 rounded-3xl">
                  <p className="text-xl text-base-content/50 font-medium">
                    No scholarships found at the moment.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default LatestScholarships;
