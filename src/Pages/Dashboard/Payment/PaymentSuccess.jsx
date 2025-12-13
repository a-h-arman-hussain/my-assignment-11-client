import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../Shared/Loader/Loader";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const applicationId = searchParams.get("applicationId");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId && applicationId) {
      axiosSecure
        .patch(`/payments/complete/${applicationId}`, { sessionId })
        .then((res) => {
          setPaymentData(res.data);
          setLoading(false);
          setTimeout(() => navigate("/dashboard/my-applications"), 5000);
        })
        .catch((err) => {
          console.error(
            "Payment complete error:",
            err.response?.data || err.message
          );
          alert(err.response?.data?.message || "Payment not completed");
          setLoading(false);
        });
    }
  }, [sessionId, applicationId, axiosSecure, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl border border-base-300 p-6">
        <h1 className="text-3xl font-bold text-green-600 mb-4 text-center">
          Payment Successful!
        </h1>
        <p className="text-center mb-6 text-gray-700">
          Thank you for your payment. You will be redirected shortly...
        </p>

        {paymentData && (
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Scholarship:</span>
              <span className="text-gray-800">
                {paymentData.scholarshipName}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">University:</span>
              <span className="text-gray-800">
                {paymentData.universityName}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Student:</span>
              <span className="text-gray-800">{paymentData.studentName}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Amount Paid:</span>
              <span className="text-gray-800">
                ${paymentData.applicationFees}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">
                Transaction ID:
              </span>
              <span className="text-gray-800">{paymentData.transactionId}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Tracking ID:</span>
              <span className="text-gray-800">{paymentData.trackingId}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Status:</span>
              <span className="text-green-600 font-bold">
                {paymentData.paymentStatus}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
