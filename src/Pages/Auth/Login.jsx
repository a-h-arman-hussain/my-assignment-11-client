import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

export default function Login() {
  const { signInUser, signInGoogle } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Email login
  const onSubmit = async (data) => {
    try {
      await signInUser(data.email, data.password);

      Swal.fire({
        title: "Welcome Back! 👋",
        text: "Login Successful",
        icon: "success",
        background: "rgba(31, 41, 55, 0.8)",
        color: "#fff",
        confirmButtonColor: "#8b5cf6",
      });

      navigate("/");
    } catch (err) {
      Swal.fire({
        title: "Login Failed!",
        text: err.message,
        icon: "error",
        background: "rgba(31, 41, 55, 0.8)",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  // Google Login + DB save
  const handleGoogleLogin = async () => {
    try {
      // Google Login
      const result = await signInGoogle();
      const user = result.user;

      // 1️⃣ Check if user already exists in DB
      const { data: existingUser } = await axiosSecure.get(
        `/users/${user.email}`
      );

      // 2️⃣ If user DOES NOT exist → Create new user
      if (!existingUser) {
        const savedUser = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          role: "Student",
        };

        await axiosSecure.post("/users", savedUser);
      }

      // SweetAlert
      Swal.fire({
        title: "Google Login Successful 🔥",
        text: existingUser
          ? "Welcome back to ScholarStream!"
          : "Account created & logged in successfully!",
        icon: "success",
        background: "rgba(31, 41, 55, 0.8)",
        color: "#fff",
        confirmButtonColor: "#8b5cf6",
      });

      navigate("/");
    } catch (err) {
      Swal.fire({
        title: "Google Login Failed!",
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
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
              {...register("password", { required: "Password is required" })}
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
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 mb-3">Or login with</p>
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-semibold transition shadow-lg shadow-red-500/20"
          >
            Google Login
          </button>
        </div>

        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-purple-500 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
