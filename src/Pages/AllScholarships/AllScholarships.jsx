import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ScholarshipCard from "./ScholarshipCard";
import Loader from "../Shared/Loader/Loader";

const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter states
  const [search, setSearch] = useState("");
  const [subjectCategory, setSubjectCategory] = useState("");
  const [scholarshipCategory, setScholarshipCategory] = useState("");
  const [degree, setDegree] = useState("");

  const [subjects, setSubjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [degrees, setDegrees] = useState([]);

  const axiosSecure = useAxiosSecure();

  // Fetch scholarships from server
  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await axiosSecure.get("/all-scholarships");
        setScholarships(res.data);

        // Extract unique values for filters
        setSubjects([...new Set(res.data.map((s) => s.subjectCategory))]);
        setCategories([...new Set(res.data.map((s) => s.scholarshipCategory))]);
        setDegrees([...new Set(res.data.map((s) => s.degree))]);
      } catch (err) {
        console.error("Failed to fetch scholarships:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchScholarships();
  }, [axiosSecure]);

  if (loading) return <Loader />;

  // Filter scholarships
  const filteredScholarships = scholarships.filter((scholar) => {
    const matchesSearch =
      scholar.scholarshipName.toLowerCase().includes(search.toLowerCase()) ||
      scholar.universityName.toLowerCase().includes(search.toLowerCase()) ||
      scholar.degree.toLowerCase().includes(search.toLowerCase());

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

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Scholarships</h1>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by Scholarship, University, or Degree"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 flex-1"
        />

        <select
          value={subjectCategory}
          onChange={(e) => setSubjectCategory(e.target.value)}
          className="border border-gray-300 rounded-lg p-2"
        >
          <option value="">All Subjects</option>
          {subjects.map((subj, i) => (
            <option key={i} value={subj}>
              {subj}
            </option>
          ))}
        </select>

        <select
          value={scholarshipCategory}
          onChange={(e) => setScholarshipCategory(e.target.value)}
          className="border border-gray-300 rounded-lg p-2"
        >
          <option value="">All Categories</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
          className="border border-gray-300 rounded-lg p-2"
        >
          <option value="">All Degrees</option>
          {degrees.map((d, i) => (
            <option key={i} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* Scholarships Grid */}
      {filteredScholarships.length === 0 ? (
        <p className="text-center text-gray-400">No scholarships found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredScholarships.map((scholar) => (
            <ScholarshipCard key={scholar._id} scholar={scholar} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllScholarships;
