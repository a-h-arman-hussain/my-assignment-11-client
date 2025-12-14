import React from "react";
import { Link } from "react-router";
import logo from "../../../assets/Screenshot_2025-12-13_191151-removebg-preview.png";

const Footer = () => {
  return (
    <footer className="text-base-100 py-10 max-w-11/12 mx-auto">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between gap-8">
        {/* Logo & Description */}
        <div className="flex-1">
          <Link to="/">
            <img src={logo} alt="" className="w-40 h-12" />
          </Link>
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
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/all-scholarships"
                className="hover:text-primary transition-colors"
              >
                All Scholarships
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-primary transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-primary transition-colors"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3 text-secondary">
            Contact Us
          </h3>
          <p className="text-muted">Email: aharmanhussain@gmail.com</p>
          <p className="text-muted">Phone: +8801 3153 15449</p>

          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-primary transition-colors">
              Facebook
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-primary transition-colors">
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
