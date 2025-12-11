import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

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
        title: "Registration Successful! 🎉",
        text: "Your account has been created successfully.",
        icon: "success",
        background: "rgba(31, 41, 55, 0.8)",
        color: "#fff",
        confirmButtonColor: "#8b5cf6",
        confirmButtonText: "Continue",
        backdrop: `
          rgba(0,0,0,0.6)
          url("https://i.gifer.com/ZZ5H.gif")
          center top
          no-repeat
        `,
      });

      navigate("/");
      reset();
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.message,
        icon: "error",
        background: "rgba(31, 41, 55, 0.8)",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <div className="w-full max-w-md bg-gray-800/60 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="font-medium text-gray-300">Full Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white mt-1 focus:outline-none focus:border-purple-500"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Photo URL */}
          <div>
            <label className="font-medium text-gray-300">Photo URL</label>
            <input
              type="text"
              {...register("photo")}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white mt-1 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="font-medium text-gray-300">Email Address</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white mt-1 focus:outline-none focus:border-purple-500"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="font-medium text-gray-300">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white mt-1 focus:outline-none focus:border-purple-500"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold transition shadow-lg shadow-purple-500/20"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
