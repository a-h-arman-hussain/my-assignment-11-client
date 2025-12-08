import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ScholarshipCard from "../../AllScholarships/ScholarshipCard";
import Loader from "../../Shared/Loader/Loader";

const LatestScholarships = () => {
  const [latestScholarships, setLatestScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

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

  if (loading) return <Loader></Loader>;

  return (
    <section className="py-12 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Latest Scholarships
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {latestScholarships.length > 0 ? (
            latestScholarships.map((scholar) => (
              <ScholarshipCard key={scholar._id} scholar={scholar} />
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-full">
              No scholarships found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestScholarships;
