import Lottie from "lottie-react";
import forbiddenAnimation from "../../assets/forbidden.json";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-center px-4">
      <div className="w-64">
        <Lottie animationData={forbiddenAnimation} loop={false} />
      </div>

      <h1 className="text-3xl font-bold text-error mt-4">Access Forbidden</h1>

      <p className="text-gray-500 mt-2">
        You don’t have permission to view this page
      </p>

      <div className="flex gap-4 mt-6">
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
        <Link to="/dashboard" className="btn border border-primary text-primary">
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
