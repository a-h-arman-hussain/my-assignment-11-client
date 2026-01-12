import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";

export default function ContactUs() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Form Submission Logic
  const onSubmit = async (data) => {
    setLoading(true);
    // সিমুলেটিং এপিআই কল
    setTimeout(() => {
      setLoading(false);
      Swal.fire({
        title: "Message Sent!",
        text: `Thank you ${data.name}, we will get back to you soon.`,
        icon: "success",
        confirmButtonColor: "#3b82f6", // Primary Color
        customClass: { popup: "rounded-[2rem]" },
      });
      reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen text-base-content py-10">
      {/* Contact Header Section */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* ১. সাব-টাইটেল: সাপোর্ট বোঝাতে */}
          <span className="text-primary font-black tracking-[0.3em] uppercase text-[10px] md:text-xs">
            Contact Support
          </span>

          {/* ২. মেইন টাইটেল: Standardized Typography (text-base-content + primary highlight) */}
          <h1 className="text-4xl md:text-6xl font-black text-base-content mt-3 uppercase tracking-tighter">
            Get In <span className="text-primary">Touch</span>
          </h1>

          {/* ৩. ডেসক্রিপশন: প্রফেশনাল টেক্সট ব্যালেন্স */}
          <p className="text-base-content/60 mt-4 max-w-2xl mx-auto font-medium text-sm md:text-lg px-6">
            Have questions about scholarships? Our team is ready to assist you
            and guide you through your journey.
          </p>

          {/* ৪. ডেকোরেটিভ বার: ইউনিফাইড ডিজাইন */}
          <div className="w-24 h-1.5 bg-primary mx-auto mt-6 rounded-full shadow-lg shadow-primary/20"></div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info Cards */}
        <div className="space-y-6">
          {[
            {
              icon: <FiMail />,
              title: "Email Us",
              detail: "armanhd16@gmail.com",
              bg: "bg-blue-50 dark:bg-blue-900/10",
            },
            {
              icon: <FiPhone />,
              title: "Call Us",
              detail: "+880 1315 315449",
              bg: "bg-yellow-50 dark:bg-yellow-900/10",
            },
            {
              icon: <FiMapPin />,
              title: "Visit Us",
              detail: "Chittagong, Bangladesh",
              bg: "bg-green-50 dark:bg-green-900/10",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ x: 10 }}
              className={`p-8 rounded-[2rem] border border-base-300 shadow-sm ${item.bg} flex items-center gap-5`}
            >
              <div className="text-3xl text-primary">{item.icon}</div>
              <div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-base-content/70 text-sm">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Form - Global Rule: Validation & States */}
        <div className="lg:col-span-2">
          <div className="bg-base-100 p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-base-300">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Input */}
                <div className="form-control">
                  <label className="label font-bold text-xs uppercase tracking-widest opacity-60">
                    Your Name
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    placeholder="John Doe"
                    className={`input input-bordered w-full rounded-2xl h-14 bg-base-200/50 focus:ring-2 focus:ring-primary ${
                      errors.name ? "border-error" : ""
                    }`}
                  />
                  {errors.name && (
                    <span className="text-error text-xs mt-1">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* Email Input */}
                <div className="form-control">
                  <label className="label font-bold text-xs uppercase tracking-widest opacity-60">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email",
                      },
                    })}
                    placeholder="name@example.com"
                    className={`input input-bordered w-full rounded-2xl h-14 bg-base-200/50 focus:ring-2 focus:ring-primary ${
                      errors.email ? "border-error" : ""
                    }`}
                  />
                  {errors.email && (
                    <span className="text-error text-xs mt-1">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="form-control">
                <label className="label font-bold text-xs uppercase tracking-widest opacity-60">
                  Subject
                </label>
                <input
                  type="text"
                  {...register("subject", {
                    required: "Subject is required",
                  })}
                  placeholder="How can we help?"
                  className={`input input-bordered w-full rounded-2xl h-14 bg-base-200/50 focus:ring-2 focus:ring-primary ${
                    errors.subject ? "border-error" : ""
                  }`}
                />
              </div>

              {/* Message */}
              <div className="form-control">
                <label className="label font-bold text-xs uppercase tracking-widest opacity-60">
                  Message
                </label>
                <textarea
                  rows="4"
                  {...register("message", {
                    required: "Message cannot be empty",
                  })}
                  placeholder="Tell us more about your inquiry..."
                  className="textarea textarea-bordered w-full rounded-2xl bg-base-200/50 focus:ring-2 focus:ring-primary"
                ></textarea>
              </div>

              {/* Submit Button with Loader */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full h-16 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>
                    <FiSend /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
