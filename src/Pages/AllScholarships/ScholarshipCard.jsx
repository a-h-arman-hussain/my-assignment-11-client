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
    <div className="bg-base-100 border border-base-300 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative">
      {/* University Image */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={universityImage}
          alt={universityName}
          className="w-full h-36 object-cover transition-transform duration-500 hover:scale-110"
        />

        {/* Scholarship Category Badge */}
        <span className="absolute top-2 right-2 bg-accent text-base-100 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
          {scholarshipCategory}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col space-y-2">
        {/* Scholarship Name */}
        <h2 className="text-primary text-lg font-semibold leading-tight">
          {scholarshipName}
        </h2>

        {/* University Name */}
        <p className="text-muted text-sm">{universityName}</p>

        {/* Location */}
        <p className="text-muted text-xs">
          {universityCity}, {universityCountry}
        </p>

        {/* Application Fees */}
        {applicationFees > 0 && (
          <p className="text-muted text-xs font-medium">
            Application Fees: ${applicationFees}
          </p>
        )}

        {/* View Details Button */}
        <Link
          to={`/scholarship-details/${_id}`}
          className="mt-3 w-full text-center bg-primary hover:bg-primary/90 text-base-100 text-sm font-semibold py-2 rounded-xl transition duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ScholarshipCard;



