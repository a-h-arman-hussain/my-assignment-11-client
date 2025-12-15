import React from "react";

export default function ContactUs() {
  return (
    <div className="min-h-screen text-neutral px-6 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl text-center font-bold text-primary mb-6">Contact Us</h1>
        <p className="text-lg text-center text-muted mb-10">
          Have questions or need support? We're here to help. Fill out the form
          below, and our team will get back to you as soon as possible.
        </p>

        {/* Contact Card */}
        <div className="bg-base-100 p-8 rounded-2xl shadow border border-base-300 mb-16">
          <form className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <input
                type="text"
                placeholder="Subject here"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                rows="5"
                placeholder="Write your message..."
                className="textarea textarea-bordered w-full"
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn bg-primary text-base-100 font-semibold shadow-lg w-full"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-base-100 p-6 rounded-2xl shadow border border-base-300">
            <h3 className="text-lg font-semibold text-primary mb-2">Email</h3>
            <p className="text-muted text-sm">armanhd16@gmail.com</p>
          </div>

          <div className="bg-base-100 p-6 rounded-2xl shadow border border-base-300">
            <h3 className="text-lg font-semibold text-primary mb-2">Phone</h3>
            <p className="text-muted text-sm">+8801 3153 15449</p>
          </div>

          <div className="bg-base-100 p-6 rounded-2xl shadow border border-base-300">
            <h3 className="text-lg font-semibold text-primary mb-2">Address</h3>
            <p className="text-muted text-sm">Chittagong, Bangladesh</p>
          </div>
        </div>
      </div>
    </div>
  );
}
