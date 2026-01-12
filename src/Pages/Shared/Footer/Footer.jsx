import React from "react";
import { Link } from "react-router";
import logo from "../../../assets/Screenshot_2025-12-13_191151-removebg-preview.png";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const Footer = () => {
  return (
    // Global Rule: Consistent background using base-200 or neutral for footer
    <footer className="text-base-content pt-12 pb-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Logo & Description */}
          <div className="flex-1 space-y-6">
            <Link to="/" className="inline-block">
              {/* Logo with filter to ensure visibility in both modes if needed */}
              <img
                src={logo}
                alt="ScholarStream Logo"
                className="w-48 h-auto object-contain dark:brightness-110"
              />
            </Link>
            <p className="text-base-content/70 leading-relaxed max-w-sm">
              Discover global scholarships, apply easily, and unlock your
              future. Join thousands of students achieving their dreams
              worldwide with ScholarStream.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex-1 lg:ml-20">
            <h3 className="text-xl font-bold mb-6 text-primary">Quick Links</h3>
            <ul className="grid grid-cols-1 gap-4 font-medium">
              <li>
                <Link
                  to="/"
                  className="hover:text-primary transition-all hover:translate-x-1 inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/all-scholarships"
                  className="hover:text-primary transition-all hover:translate-x-1 inline-block"
                >
                  All Scholarships
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary transition-all hover:translate-x-1 inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primary transition-all hover:translate-x-1 inline-block"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-6 text-primary">
              Connect With Us
            </h3>
            <div className="space-y-3 text-base-content/80">
              <p className="flex items-center gap-2">
                <span className="font-bold text-secondary text-sm">Email:</span>
                aharmanhussain@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <span className="font-bold text-secondary text-sm">Phone:</span>
                +880 1315 315449
              </p>
            </div>

            {/* Social Icons with Global Primary Color */}
            <div className="flex gap-4 mt-8">
              {[
                {
                  icon: <FaFacebook />,
                  link: "https://www.facebook.com/a.h.arman.hussain",
                },
                {
                  icon: <FaLinkedin />,
                  link: "https://www.linkedin.com/in/mohammed-abdul-hakim-arman/",
                },
                {
                  icon: <FaGithub />,
                  link: "https://github.com/a-h-arman-hussain",
                },
                { icon: <SiGmail />, link: "mailto:armanhd16@gmail.com" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
                >
                  {React.cloneElement(social.icon, { size: 20 })}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-base-300 mt-12 pt-6">
          <div className="flex justify-center items-center text-sm text-base-content/50 font-medium">
            <p>
              &copy; {new Date().getFullYear()}{" "}
              <span className="text-primary font-bold">ScholarStream</span>. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
