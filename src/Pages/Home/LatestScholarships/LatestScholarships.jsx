import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ScholarshipCard from "../../AllScholarships/ScholarshipCard";
import Loader from "../../Shared/Loader/Loader";
import { motion, AnimatePresence } from "framer-motion";

const LatestScholarships = () => {
  const [latestScholarships, setLatestScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await axiosSecure.get("/latest-scholarships");
        setLatestScholarships(res.data);
      } catch (err) {
        console.error("Failed to fetch latest scholarships:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatest();
  }, [axiosSecure]);

  if (loading) return <Loader />;

  return (
    <motion.section
      className="py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="container mx-auto px-6 text-center mb-8"
        variants={fadeUp}
      >
        <h2 className="text-3xl font-bold text-primary">Latest Scholarships</h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        variants={containerVariants}
        layout
      >
        <AnimatePresence>
          {latestScholarships.length > 0 ? (
            latestScholarships.map((scholar) => (
              <motion.div
                key={scholar._id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.97 }}
                layout
              >
                <ScholarshipCard scholar={scholar} />
              </motion.div>
            ))
          ) : (
            <motion.p
              className="text-muted text-center col-span-full"
              variants={fadeUp}
            >
              No scholarships found.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};

export default LatestScholarships;
