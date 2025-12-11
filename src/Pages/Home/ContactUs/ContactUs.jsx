import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Normally here you would send data to your server
    console.log(data);
    Swal.fire({
      title: "Message Sent! ✅",
      text: `Thank you, ${data.name}. We will get back to you soon!`,
      icon: "success",
      background: "rgba(31, 41, 55, 0.8)",
      color: "#fff",
      confirmButtonColor: "#8b5cf6",
    });
    reset();
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4 py-16">
      <div className="w-full max-w-2xl bg-gray-800/60 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-gray-700">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="text-gray-300 font-medium">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-3 mt-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-purple-500"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="text-gray-300 font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-3 mt-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-purple-500"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-gray-300 font-medium">Message</label>
            <textarea
              {...register("message", { required: "Message is required" })}
              className="w-full p-3 mt-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-purple-500"
              rows={5}
            />
            {errors.message && (
              <p className="text-red-400 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-xl font-semibold shadow-lg shadow-purple-500/30 transition-all duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
