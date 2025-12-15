import React from "react";
import arman from "../../assets/arman.jpg";
import saim from "../../assets/saim.jpg";
import raihan from "../../assets/raihan.jpg";

export default function AboutPage() {
  return (
    <div className="min-h-screen text-neutral px-6 py-16">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl text-center font-bold text-primary mb-6">
          About Us
        </h1>

        {/* Intro Section */}
        <p className="text-lg text-center text-muted leading-relaxed mb-10">
          Welcome to our platform, where we connect passionate learners with
          global opportunities. Our mission is to provide accessible,
          high‑quality scholarship information that empowers students to achieve
          their academic dreams.
        </p>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 bg-base-100 rounded-2xl shadow-md border border-base-300">
            <h3 className="text-xl font-semibold text-primary mb-2">
              Our Mission
            </h3>
            <p className="text-muted text-sm">
              To simplify the scholarship search process and guide students
              towards the best academic opportunities.
            </p>
          </div>

          <div className="p-6 bg-base-100 rounded-2xl shadow-md border border-base-300">
            <h3 className="text-xl font-semibold text-primary mb-2">
              Our Vision
            </h3>
            <p className="text-muted text-sm">
              A world where every student has equal access to educational
              resources and opportunities globally.
            </p>
          </div>

          <div className="p-6 bg-base-100 rounded-2xl shadow-md border border-base-300">
            <h3 className="text-xl font-semibold text-primary mb-2">
              Our Values
            </h3>
            <p className="text-muted text-sm">
              Transparency, accessibility, and a commitment to empowering
              students.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <h2 className="text-3xl text-center font-bold text-primary mb-6">
          Meet the Team
        </h2>
        <p className="text-center text-muted mb-10">
          Our team is built with dedicated developers, researchers, and
          education‑enthusiasts working together to make scholarship access
          easier.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center bg-base-100 p-6 rounded-2xl shadow border border-base-300">
            <img
              src={arman}
              alt="Team Member"
              className="w-28 h-28 rounded-full mb-4"
            />
            <h3 className="text-lg font-semibold">A H Arman Hussain</h3>
            <p className="text-muted text-sm">Founder & Lead Developer</p>
          </div>

          <div className="flex flex-col items-center text-center bg-base-100 p-6 rounded-2xl shadow border border-base-300">
            <img
              src={saim}
              alt="Team Member"
              className="w-28 h-28 rounded-full mb-4"
            />
            <h3 className="text-lg font-semibold">Abdul Karim Saim</h3>
            <p className="text-muted text-sm">Research Specialist</p>
          </div>

          <div className="flex flex-col items-center text-center bg-base-100 p-6 rounded-2xl shadow border border-base-300">
            <img
              src={raihan}
              alt="Team Member"
              className="w-28 h-28 rounded-full mb-4"
            />
            <h3 className="text-lg font-semibold">Mesbah Uddin Raihan</h3>
            <p className="text-muted text-sm">UI/UX Designer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
