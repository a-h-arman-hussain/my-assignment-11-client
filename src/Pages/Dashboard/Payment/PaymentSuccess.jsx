import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const applicationId = searchParams.get("applicationId"); // ✅ from success_url
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionId && applicationId) {
      axiosSecure
        .patch(`/payments/complete/${applicationId}`, {
          sessionId,
        })
        .then((res) => {
          console.log("Payment success data:", res.data);

          // 3 seconds later redirect to My Applications
          setTimeout(() => {
            navigate("/dashboard/my-applications");
          }, 3000);
        })
        .catch((err) => {
          console.error("Payment patch error:", err);
        });
    }
  }, [sessionId, applicationId, axiosSecure, navigate]);

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
