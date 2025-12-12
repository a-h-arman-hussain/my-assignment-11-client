import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-neutral text-base-100 py-10">
      <div className="container mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-between gap-8">
        {/* Logo & Description */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-primary mb-4">
            ScholarStream
          </h2>
          <p className="text-muted">
            Discover global scholarships, apply easily, and unlock your future.
            Join thousands of students achieving their dreams worldwide.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3 text-secondary">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-warning transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/all-scholarships"
                className="hover:text-warning transition-colors"
              >
                All Scholarships
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="hover:text-warning transition-colors"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="hover:text-warning transition-colors"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3 text-secondary">
            Contact Us
          </h3>
          <p className="text-muted">Email: support@scholarstream.com</p>
          <p className="text-muted">Phone: +1 234 567 890</p>

          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-warning transition-colors">
              Facebook
            </a>
            <a href="#" className="hover:text-warning transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-warning transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-base-300 mt-10 pt-6 text-center text-muted text-sm">
        &copy; {new Date().getFullYear()} ScholarStream. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
