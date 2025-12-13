import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FaUserPlus } from "react-icons/fa";

export default function Register() {
  const { registerUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await registerUser(data.email, data.password);

      await updateUserProfile({
        displayName: data.name,
        photoURL: data.photo,
      });

      const savedUser = {
        name: data.name,
        email: data.email,
        photo: data.photo,
        role: "Student",
      };

      await axiosSecure.post("/users", savedUser);

      Swal.fire({
        title: "Registration Successful!",
        text: "Your account has been created successfully.",
        icon: "success",
        background: "var(--color-base-200)",
        color: "var(--color-neutral)",
        confirmButtonColor: "var(--color-primary)",
        confirmButtonText: "Continue",
      });

      navigate("/");
      reset();
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.message,
        icon: "error",
        background: "var(--color-base-200)",
        color: "var(--color-neutral)",
        confirmButtonColor: "var(--color-error)",
      });
    }
  };

  return (
    <div className="flex items-center justify-center bg-base-200 px-2">
      <div className="w-full md:max-w-full bg-base-100/80 backdrop-blur-lg p-5 md:p-8 rounded-2xl shadow-2xl border border-base-300">
        <h2 className="text-2xl font-bold text-center mb-6 text-primary">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="font-medium text-muted">Full Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-3 bg-base-100 border border-base-300 rounded-lg text-neutral mt-1 focus:outline-none focus:border-primary"
            />
            {errors.name && (
              <p className="text-error text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Photo URL */}
          <div>
            <label className="font-medium text-muted">Photo URL</label>
            <input
              type="text"
              {...register("photo")}
              className="w-full p-3 bg-base-100 border border-base-300 rounded-lg text-neutral mt-1 focus:outline-none focus:border-primary"
            />
          </div>

          {/* Email */}
          <div>
            <label className="font-medium text-muted">Email Address</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-3 bg-base-100 border border-base-300 rounded-lg text-neutral mt-1 focus:outline-none focus:border-primary"
            />
            {errors.email && (
              <p className="text-error text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="font-medium text-muted">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full p-3 bg-base-100 border border-base-300 rounded-lg text-neutral mt-1 focus:outline-none focus:border-primary"
            />
            {errors.password && (
              <p className="text-error text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-base-100 p-2 rounded-lg font-semibold transition shadow-md cursor-pointer"
          >
            <div className="flex items-center justify-center gap-1 text-lg">
              <FaUserPlus />
              Register
            </div>
          </button>
        </form>

        <p className="mt-6 text-center text-muted">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-accent font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
