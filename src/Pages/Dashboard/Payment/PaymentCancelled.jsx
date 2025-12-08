import React from "react";
import { Link } from "react-router";

const PaymentCancelled = () => {
  return (
    <div>
      <h1>PaymentCancelled</h1>
      <Link to='/all-scholarships' className="btn">Go to all Scholarships</Link>
    </div>
  );
};

export default PaymentCancelled;
