import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ScholarshipCard from "./ScholarshipCard";
import Loader from "../Shared/Loader/Loader";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

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

  const [subjects, setSubjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [degrees, setDegrees] = useState([]);

  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    setPage(1);
  }, [search, subjectCategory, scholarshipCategory, degree]);

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
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchScholarships();
  }, [axiosSecure]);

  // Filter Logic
  const filteredScholarships = scholarships.filter((scholar) => {
    const matchesSearch =
      scholar.scholarshipName?.toLowerCase().includes(search.toLowerCase()) ||
      scholar.universityName?.toLowerCase().includes(search.toLowerCase());
    const matchesSubject = subjectCategory
      ? scholar.subjectCategory === subjectCategory
      : true;
    const matchesCategory = scholarshipCategory
      ? scholar.scholarshipCategory === scholarshipCategory
      : true;
    const matchesDegree = degree ? scholar.degree === degree : true;
    return matchesSearch && matchesSubject && matchesCategory && matchesDegree;
  });

  const totalPages = Math.ceil(filteredScholarships.length / itemsPerPage) || 1;
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedScholarships = filteredScholarships.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) return <Loader />;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen py-6 mx-auto"
    >
      {/* Main Header Section - All Scholarships Page */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        {/* ১. মেইন টাইটেল - বড় এবং বোল্ড টাইপোগ্রাফি */}
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-base-content">
          All <span className="text-primary">Scholarships</span>
        </h1>

        {/* ২. ডাইনামিক সাব-টাইটেল - আপনার সেট করা গ্লোবাল স্টাইল অনুযায়ী */}
        <p className="text-[10px] md:text-xs font-black opacity-40 uppercase tracking-[0.3em] md:tracking-[0.5em] mt-4">
          Explore{" "}
          <span className="text-primary/80">{scholarships.length}+</span> Global
          Opportunities
        </p>

        {/* ৩. ডেকোরেটিভ বার - ইউনিফাইড হাইট ও উইডথ */}
        <div className="w-24 h-1.5 bg-primary mx-auto mt-6 rounded-full shadow-lg shadow-primary/20"></div>
      </motion.div>

      {/* Glassmorphism Filter Bar */}
      <motion.div
        variants={fadeUp}
        className="bg-base-100/60 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-base-300 mb-8"
      >
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Search Input */}
          <div className="relative flex-1 group">
            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-primary text-xl transition-transform group-focus-within:scale-110" />
            <input
              type="text"
              placeholder="Search by University or Scholarship name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input w-full pl-16 h-16 rounded-[1.5rem] bg-base-200/50 border-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-sm"
            />
          </div>

          {/* Select Dropdowns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-[1.5]">
            <FilterSelect
              value={subjectCategory}
              set={setSubjectCategory}
              options={subjects}
              label="Subject"
              icon={<FiFilter />}
            />
            <FilterSelect
              value={scholarshipCategory}
              set={setScholarshipCategory}
              options={categories}
              label="Category"
              icon={<FiFilter />}
            />
            <FilterSelect
              value={degree}
              set={setDegree}
              options={degrees}
              label="Degree"
              icon={<FiFilter />}
            />

            {/* Sort Select */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="select h-16 rounded-[1.5rem] bg-base-200/50 border-none focus:ring-2 focus:ring-primary/20 font-black uppercase text-[10px] tracking-widest"
            >
              <option value="">Sort By</option>
              <option value="fees-asc">Fees: Low to High</option>
              <option value="fees-desc">Fees: High to Low</option>
              <option value="date-desc">Newest First</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Grid Section */}
      <AnimatePresence mode="wait">
        {paginatedScholarships.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30">
              No Scholarships Found
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {paginatedScholarships.map((scholar) => (
              <motion.div
                key={scholar._id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <ScholarshipCard scholar={scholar} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination - Premium Style */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-8">
          <PaginationBtn
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            icon={<FiChevronLeft />}
          />

          <div className="flex gap-2 bg-base-300/30 p-2 rounded-full">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 rounded-full font-black text-xs transition-all ${
                  page === i + 1
                    ? "bg-primary text-white shadow-lg shadow-primary/30 scale-110"
                    : "hover:bg-base-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <PaginationBtn
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            icon={<FiChevronRight />}
          />
        </div>
      )}
    </motion.div>
  );
};

// Internal Helper Components
const FilterSelect = ({ value, set, options, label, icon }) => (
  <select
    value={value}
    onChange={(e) => set(e.target.value)}
    className="select h-16 rounded-[1.5rem] bg-base-200/50 border-none focus:ring-2 focus:ring-primary/20 font-black uppercase text-[10px] tracking-widest transition-all"
  >
    <option value="">{label}</option>
    {options.map((opt, i) => (
      <option key={i} value={opt}>
        {opt}
      </option>
    ))}
  </select>
);

const PaginationBtn = ({ onClick, disabled, icon }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="w-12 h-12 flex items-center justify-center rounded-full bg-base-100 border border-base-300 shadow-sm hover:bg-primary hover:text-white transition-all disabled:opacity-20 disabled:pointer-events-none"
  >
    {icon}
  </button>
);

export default AllScholarships;
