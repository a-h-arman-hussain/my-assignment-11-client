import React from "react";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      <h1 className="text-9xl font-extrabold text-yellow-400 mb-6">404</h1>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-300 mb-8 text-center">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-full transition-shadow shadow-md hover:shadow-xl"
      >
        Go Back Home
      </Link>

      {/* Decorative Shapes */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-purple-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
    </div>
  );
};

export default NotFoundPage;
