import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2"; // আপনি চাইলে react-hot-toast ও ব্যবহার করতে পারেন
import { motion } from "framer-motion";

const Newsletter = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    // এখানে আপনার API কল হবে, আপাতত আমরা একটি ডিলে দিয়ে সাকসেস স্টেট দেখাচ্ছি
    setTimeout(() => {
      setLoading(false);
      Swal.fire({
        title: "Success!",
        text: "Thank you for subscribing to our newsletter.",
        icon: "success",
        confirmButtonColor: "#3b82f6", // আপনার Primary Color
        customClass: {
          popup: "rounded-[2rem]",
          confirmButton: "rounded-full px-8",
        },
      });
      reset();
    }, 1500);
  };

  return (
    <section className="my-10 md:my-16">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-primary rounded-[3rem] p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden"
        >
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/10 rounded-full blur-2xl -ml-10 -mb-10"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              Don't Miss Any{" "}
              <span className="text-secondary">Opportunity!</span>
            </h2>
            <p className="mb-10 opacity-90 max-w-xl mx-auto text-lg">
              Subscribe to our newsletter and get the latest international
              scholarship alerts directly in your inbox.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-md mx-auto"
            >
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-0 relative">
                {/* Email Input Field */}
                <div className="w-full relative flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`w-full h-14 px-8 rounded-[1.5rem] sm:rounded-l-[2rem] sm:rounded-r-none bg-base-100/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-secondary transition-all ${
                      errors.email ? "border-red-400" : "border-white/20"
                    }`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>

                {/* Subscribe Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-secondary w-full sm:w-auto h-14 rounded-[1.5rem] sm:rounded-r-[2rem] sm:rounded-l-none px-10 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-secondary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>

              {/* Error Message Section - Absolute to avoid shifting layout */}
              <div className="h-6 mt-2 text-center sm:text-left">
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-300 text-[10px] font-black uppercase tracking-widest ml-4"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </div>
            </form>

            <p className="mt-6 text-xs opacity-70">
              We care about your privacy. Unsubscribe at any time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
