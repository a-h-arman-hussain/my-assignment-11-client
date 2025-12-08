import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10">
      <div className="container mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-between gap-8">
        
        {/* Logo & Description */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">ScholarStream</h2>
          <p className="text-gray-400">
            Discover global scholarships, apply easily, and unlock your future. 
            Join thousands of students achieving their dreams worldwide.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
            </li>
            <li>
              <Link to="/all-scholarships" className="hover:text-yellow-400 transition">All Scholarships</Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-yellow-400 transition">Register</Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-yellow-400 transition">Login</Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="text-gray-400">Email: support@scholarstream.com</p>
          <p className="text-gray-400">Phone: +1 234 567 890</p>

          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-yellow-400 transition">Facebook</a>
            <a href="#" className="hover:text-yellow-400 transition">Twitter</a>
            <a href="#" className="hover:text-yellow-400 transition">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} ScholarStream. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
