import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../Shared/Loader/Loader";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/my-applications?email=${user.email}`)
        .then((res) => {
          const paidPayments = res.data.filter(
            (app) => app.paymentStatus === "paid"
          );
          setPayments(paidPayments);
          setLoading(false);
        })
        .catch((err) => {
          console.error(
            "Failed to fetch payments:",
            err.response?.data || err.message
          );
          setLoading(false);
        });
    }
  }, [user, axiosSecure]);

  if (loading) return <Loader />;

  if (!payments.length) {
    return (
      <div className="text-center mt-20 text-gray-500">
        No payment history found.
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-base-200">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">
        My Payment History
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {payments.map((payment) => (
          <div
            key={payment._id}
            className="card bg-base-100 shadow-lg border border-base-300 p-5"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">
                {payment.scholarshipName}
              </h2>
              <span className="text-sm text-gray-500">
                {new Date(payment.paidAt).toLocaleDateString()}
              </span>
            </div>

            <div className="space-y-1 text-gray-700">
              <div className="flex justify-between">
                <span>University:</span>
                <span>{payment.universityName}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <span>${payment.applicationFees}</span>
              </div>
              <div className="flex justify-between">
                <span>Transaction ID:</span>
                <span>{payment.transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span>Tracking ID:</span>
                <span>{payment.trackingId}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-green-600 font-semibold">
                  {payment.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
