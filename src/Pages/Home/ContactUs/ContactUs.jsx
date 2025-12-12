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
    console.log(data);
    Swal.fire({
      title: "Message Sent! ✅",
      text: `Thank you, ${data.name}. We will get back to you soon!`,
      icon: "success",
      background: "rgba(31, 41, 55, 0.85)",
      color: "#fff",
      confirmButtonColor: "#d35400",
    });
    reset();
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl bg-base-100/60 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-base-300">
        <h2 className="text-3xl font-bold text-primary text-center mb-8">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <InputField
            label="Name"
            type="text"
            register={register("name", { required: "Name is required" })}
            error={errors.name}
          />

          {/* Email Field */}
          <InputField
            label="Email"
            type="email"
            register={register("email", { required: "Email is required" })}
            error={errors.email}
          />

          {/* Message Field */}
          <InputField
            label="Message"
            type="textarea"
            register={register("message", { required: "Message is required" })}
            error={errors.message}
          />

          <button
            type="submit"
            className="w-full btn btn-primary text-white p-3 rounded-xl font-semibold shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

// Reusable InputField component
const InputField = ({ label, type = "text", register, error }) => {
  const commonClasses =
    "w-full p-3 mt-2 rounded-lg bg-base-200 border border-base-300 text-neutral focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition";

  return (
    <div>
      <label className="text-neutral font-medium">{label}</label>
      {type === "textarea" ? (
        <textarea
          {...register}
          className={`${commonClasses} resize-none`}
          rows={5}
        />
      ) : (
        <input type={type} {...register} className={commonClasses} />
      )}
      {error && <p className="text-error text-sm mt-1">{error.message}</p>}
    </div>
  );
};
