import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ScholarshipCard from "./ScholarshipCard";
import Loader from "../Shared/Loader/Loader";
import { motion, AnimatePresence } from "framer-motion";

const AllScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters/search
  const [search, setSearch] = useState("");
  const [subjectCategory, setSubjectCategory] = useState("");
  const [scholarshipCategory, setScholarshipCategory] = useState("");
  const [degree, setDegree] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // Dropdown options
  const [subjects, setSubjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [degrees, setDegrees] = useState([]);

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  // Reset page on search/filter change
  useEffect(() => {
    setPage(1);
  }, [search, subjectCategory, scholarshipCategory, degree]);

  // Fetch all scholarships once
  useEffect(() => {
    const fetchScholarships = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get("/all-scholarships");
        const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
        setScholarships(list);

        setSubjects([
          ...new Set(list.map((s) => s.subjectCategory).filter(Boolean)),
        ]);
        setCategories([
          ...new Set(list.map((s) => s.scholarshipCategory).filter(Boolean)),
        ]);
        setDegrees([...new Set(list.map((s) => s.degree).filter(Boolean))]);
      } catch (err) {
        console.error("Failed to fetch scholarships:", err);
        setScholarships([]);
      } finally {
        setLoading(false);
      }
    };
    fetchScholarships();
  }, [axiosSecure]);

  // Sort effect
  useEffect(() => {
    const loadScholarships = async () => {
      if (!sortOrder) return;
      const [field, order] = sortOrder.split("-");
      let sortField = "postDate";
      let sortOrderValue = "desc";
      if (field === "fees") sortField = "applicationFees";
      else if (field === "date") sortField = "postDate";
      sortOrderValue = order;

      const res = await axiosSecure.get(
        `/scholarships?sortField=${sortField}&sortOrder=${sortOrderValue}`
      );
      setScholarships(res.data);
    };
    loadScholarships();
  }, [sortOrder, axiosSecure]);

  // Filtered scholarships
  const filteredScholarships = scholarships.filter((scholar) => {
    const matchesSearch =
      scholar.scholarshipName?.toLowerCase().includes(search.toLowerCase()) ||
      scholar.universityName?.toLowerCase().includes(search.toLowerCase()) ||
      scholar.degree?.toLowerCase().includes(search.toLowerCase());
    const matchesSubject = subjectCategory
      ? scholar.subjectCategory?.toLowerCase().trim() ===
        subjectCategory.toLowerCase().trim()
      : true;
    const matchesCategory = scholarshipCategory
      ? scholar.scholarshipCategory?.toLowerCase().trim() ===
        scholarshipCategory.toLowerCase().trim()
      : true;
    const matchesDegree = degree
      ? scholar.degree?.toLowerCase().trim() === degree.toLowerCase().trim()
      : true;
    return matchesSearch && matchesSubject && matchesCategory && matchesDegree;
  });

  const totalPages = filteredScholarships.length
    ? Math.ceil(filteredScholarships.length / itemsPerPage)
    : 1;

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  if (loading) return <Loader />;

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedScholarships = filteredScholarships.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const pageNumbers = [];
  const startPage = Math.max(1, page - 2);
  const endPage = Math.min(totalPages, page + 2);
  for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

  return (
    <motion.div
      className="p-6 max-w-7xl mx-auto space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Heading */}
      <motion.div className="text-center" variants={fadeUp}>
        <h1 className="text-3xl font-bold text-primary">All Scholarships</h1>
        <p className="text-muted mt-1">
          Find scholarships that match your needs
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="bg-base-100 p-4 rounded-2xl shadow-md border border-base-300"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <motion.input
            type="text"
            placeholder="Search scholarships, universities, degrees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full md:w-1/3 bg-base-100 border-base-300 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
            whileFocus={{
              scale: 1.02,
              boxShadow: "0 0 10px rgba(59,130,246,0.5)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 flex-1">
            {[
              {
                value: subjectCategory,
                set: setSubjectCategory,
                options: subjects,
                placeholder: "All Subjects",
              },
              {
                value: scholarshipCategory,
                set: setScholarshipCategory,
                options: categories,
                placeholder: "All Categories",
              },
              {
                value: degree,
                set: setDegree,
                options: degrees,
                placeholder: "All Degrees",
              },
              {
                value: sortOrder,
                set: setSortOrder,
                options: ["fees-asc", "fees-desc", "date-desc", "date-asc"],
                placeholder: "Sort",
              },
            ].map((field, idx) => (
              <motion.select
                key={idx}
                value={field.value}
                onChange={(e) => field.set(e.target.value)}
                className="input input-bordered w-full bg-base-100 border-base-300 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
                whileFocus={{
                  scale: 1.02,
                  boxShadow: "0 0 10px rgba(59,130,246,0.5)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <option value="">{field.placeholder}</option>
                {field.options.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </motion.select>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scholarships */}
      {paginatedScholarships.length === 0 ? (
        <motion.p
          className="text-center text-base text-muted mt-6"
          variants={fadeUp}
        >
          No scholarships found.
        </motion.p>
      ) : (
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          layout
        >
          <AnimatePresence>
            {paginatedScholarships.map((scholar) => (
              <motion.div
                key={scholar._id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.97 }}
                layout
              >
                <ScholarshipCard scholar={scholar} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          className="flex justify-center items-center gap-2 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="btn btn-sm btn-outline border-base-300 text-primary disabled:opacity-40"
          >
            First
          </button>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="btn btn-sm btn-outline border-base-300 text-primary disabled:opacity-40"
          >
            Prev
          </button>
          {pageNumbers.map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`btn btn-sm ${
                p === page
                  ? "bg-primary text-white border-primary"
                  : "btn-outline border-base-300 text-primary"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="btn btn-sm btn-outline border-base-300 text-primary disabled:opacity-40"
          >
            Next
          </button>
          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            className="btn btn-sm btn-outline border-base-300 text-primary disabled:opacity-40"
          >
            Last
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AllScholarships;
