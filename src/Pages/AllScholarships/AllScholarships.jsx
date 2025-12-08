import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ScholarshipCard from "./ScholarshipCard";
import Loader from "../Shared/Loader/Loader";

const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await axiosSecure.get("/all-scholarships"); 
        setScholarships(res.data);
      } catch (err) {
        console.error("Failed to fetch scholarships:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, [axiosSecure]);

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Scholarships</h1>

      {scholarships.length === 0 ? (
        <p className="text-center text-gray-400">No scholarships available.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scholarships.map((scholar) => (
            <ScholarshipCard
              key={scholar._id}
              scholar={scholar}
            ></ScholarshipCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllScholarships;
