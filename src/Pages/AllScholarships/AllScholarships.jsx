import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ScholarshipCard from "./ScholarshipCard";
import Loader from "../Shared/Loader/Loader";
import SectionHeading from "../Shared/SectionHeading/SectionHeading";

const AllScholarships = () => {
  const axiosSecure = useAxiosSecure();

  // Data states
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters/search
  const [search, setSearch] = useState("");
  const [subjectCategory, setSubjectCategory] = useState("");
  const [scholarshipCategory, setScholarshipCategory] = useState("");
  const [degree, setDegree] = useState("");

  // Dropdown options
  const [subjects, setSubjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [degrees, setDegrees] = useState([]);

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  // Fetch data
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

  // Pagination logic
  const totalPages = filteredScholarships.length
    ? Math.ceil(filteredScholarships.length / itemsPerPage)
    : 1;

  // Ensure current page is valid when filters/search change
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages, search, subjectCategory, scholarshipCategory, degree]);

  if (loading) return <Loader />;

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedScholarships = filteredScholarships.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Page numbers (show max 5)
  const pageNumbers = [];
  const startPage = Math.max(1, page - 2);
  const endPage = Math.min(totalPages, page + 2);
  for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-8">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary">All Scholarships</h1>
        <p className="text-muted mt-1">
          Find scholarships that match your needs
        </p>
      </div>

      {/* Filters */}
      <div className="bg-base-100 p-5 rounded-2xl shadow-md border border-base-300">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search scholarships, universities, degrees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full bg-base-100 border-base-300 focus:outline-none focus:border-2 focus:border-primary"
          />

          {/* Subject */}
          <select
            value={subjectCategory}
            onChange={(e) => setSubjectCategory(e.target.value)}
            className="input input-bordered w-full bg-base-100 border-base-300 focus:outline-none focus:border-2 focus:border-primary"
          >
            <option value="">All Subjects</option>
            {subjects.map((subj, i) => (
              <option key={i} value={subj}>
                {subj}
              </option>
            ))}
          </select>

          {/* Scholarship Category */}
          <select
            value={scholarshipCategory}
            onChange={(e) => setScholarshipCategory(e.target.value)}
            className="input input-bordered w-full bg-base-100 border-base-300 focus:outline-none focus:border-2 focus:border-primary"
          >
            <option value="">All Categories</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Degree */}
          <select
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            className="input input-bordered w-full bg-base-100 border-base-300 focus:outline-none focus:border-2 focus:border-primary"
          >
            <option value="">All Degrees</option>
            {degrees.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      {paginatedScholarships.length === 0 ? (
        <p className="text-center text-base text-muted mt-6">
          No scholarships found.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {paginatedScholarships.map((scholar) => (
            <ScholarshipCard key={scholar._id} scholar={scholar} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
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
        </div>
      )}
    </div>
  );
};

export default AllScholarships;
