import React from "react";
import { Link } from "react-router";

const ScholarshipCard = ({ scholar }) => {
  const {
    _id,
    universityImage,
    scholarshipName,
    universityName,
    universityCity,
    universityCountry,
    scholarshipCategory,
    applicationFees,
  } = scholar;

  return (
    <div className="bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300 overflow-hidden relative">
      {/* University Image */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={universityImage}
          alt={universityName}
          className="w-full h-36 object-cover transition-transform duration-500 hover:scale-110"
        />

        {/* Scholarship Category Badge (Absolute Top-Right) */}
        <span className="absolute top-2 right-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
          {scholarshipCategory}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col space-y-2">
        {/* University Name */}
        <h2 className="text-white text-lg font-semibold truncate">
          {scholarshipName}
        </h2>

        {/* Location */}
        <p className="text-gray-300 text-xs">
          {universityCity}, {universityCountry}
        </p>

        {/* Application Fees */}
        {applicationFees > 0 && (
          <p className="text-gray-300 text-xs">Fees: ${applicationFees}</p>
        )}

        {/* View Details Button */}
        <Link
          to={`/scholarship-details/${_id}`}
          className="mt-2 w-full text-center bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white text-sm font-semibold py-2 rounded-xl shadow-md transition duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ScholarshipCard;
