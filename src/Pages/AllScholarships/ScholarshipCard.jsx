import React from "react";
import { Link } from "react-router";
import { FiMapPin, FiDollarSign, FiExternalLink } from "react-icons/fi";

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
    <div className="group bg-base-100 border border-base-300 rounded-[1.8rem] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full max-w-[420px] mx-auto">
      {/* University Image Section - Height reduced to 40 */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={universityImage || null}
          alt={universityName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Overlay Badge - Smaller & Minimal */}
        <div className="absolute top-3 left-3">
          <span className="bg-neutral/80 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
            {scholarshipCategory}
          </span>
        </div>
      </div>

      {/* Content Section - Padding reduced to p-4 */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Scholarship Name - Smaller text size */}
        <h2 className="text-base font-black text-neutral leading-tight group-hover:text-primary transition-colors line-clamp-2">
          {scholarshipName}
        </h2>

        {/* University Info - Compact layout */}
        <div className="mt-2 space-y-1">
          <p className="text-primary font-black text-[10px] uppercase tracking-tighter truncate">
            {universityName}
          </p>
          <div className="flex items-center gap-1 opacity-50">
            <FiMapPin size={10} className="shrink-0" />
            <p className="text-[10px] font-bold truncate">
              {universityCity}, {universityCountry}
            </p>
          </div>
        </div>

        {/* Bottom Section - More streamlined */}
        <div className="mt-5 pt-4 border-t border-dashed border-base-300 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[8px] uppercase font-black opacity-30 tracking-widest">
              Fees
            </span>
            <p className="font-black text-base text-neutral flex items-center">
              <span className="text-primary text-xs mr-0.5">$</span>
              {applicationFees > 0 ? applicationFees : "0"}
            </p>
          </div>

          <Link
            to={`/scholarship-details/${_id}`}
            className="btn btn-primary btn-sm rounded-xl px-5 normal-case font-black text-[10px] tracking-widest shadow-md shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            DETAILS
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;
