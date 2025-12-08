import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then(() => {
          setTimeout(() => {
            navigate("/dashboard/my-applications"); 
          }, 3000);
        })
        .catch((err) => console.error(err));
    }
  }, [sessionId, axiosSecure, navigate]);

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Payment Successful!
      </h1>
      <p>Thank you for your payment. You will be redirected shortly...</p>
    </div>
  );
};

export default PaymentSuccess;
