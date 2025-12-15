import React from "react";
import { Link } from "react-router";
import { FaTimesCircle } from "react-icons/fa";

const PaymentCancelled = () => {
  return (
    <div className=" flex items-center justify-center px-4">
      <div className="bg-base-100 shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <FaTimesCircle className="text-error text-6xl mx-auto mb-4" />

        <h1 className="text-2xl font-bold text-error mb-2">
          Payment Cancelled
        </h1>

        <p className="text-neutral mb-6">
          Your payment was cancelled. No money has been charged.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/dashboard/my-applications"
            className="btn btn-primary w-full"
          >
            Go to My Applications
          </Link>

          <Link to="/" className="btn border text-primary border-primary w-full">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
