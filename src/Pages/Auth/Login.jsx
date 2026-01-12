import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {
  FiLogIn,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUserCheck,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

export default function Login() {
  const { signInUser, signInGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    setValue, // ডেমো লগইনের জন্য ব্যবহৃত
    formState: { errors },
  } = useForm();

  // ইমেইল লগইন হ্যান্ডলার
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await signInUser(data.email, data.password);
      Swal.fire({
        title: "Welcome Back!",
        text: "You have logged in successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        customClass: { popup: "rounded-[2rem]" },
      });
      navigate(from, { replace: true });
    } catch (err) {
      Swal.fire({
        title: "Login failed!",
        text: err.message,
        icon: "error",
        customClass: { popup: "rounded-[2rem]" },
      });
    } finally {
      setLoading(false);
    }
  };

  // গুগল লগইন হ্যান্ডলার
  const handleGoogleLogin = async () => {
    try {
      const result = await signInGoogle();
      const user = result.user;

      const { data: existingUser } = await axiosSecure.get(
        `/users/${user.email}`
      );

      if (!existingUser) {
        const savedUser = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          role: "Student",
        };
        await axiosSecure.post("/users", savedUser);
      }

      Swal.fire({
        title: "Login Successful",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        customClass: { popup: "rounded-[2rem]" },
      });
      navigate(from, { replace: true });
    } catch (err) {
      Swal.fire({
        title: "Google login failed",
        text: err.message,
        icon: "error",
        customClass: { popup: "rounded-[2rem]" },
      });
    }
  };

  // ডেমো লগইন ফাংশন (Rule 6 অনুযায়ী)
  const handleDemoLogin = (role) => {
    if (role === "admin") {
      setValue("email", "admin1@gmail.com");
      setValue("password", "Admin1@gmail.com");
    } else {
      setValue("email", "student@gmail.com");
      setValue("password", "Student@gmail.com");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-base-100/80 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] border border-base-300 shadow-2xl relative z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl text-primary mb-4">
            <FiLogIn size={32} />
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">
            Welcome <span className="text-primary">Back</span>
          </h2>
          <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.3em] mt-3">
            Enter your credentials to continue
          </p>
        </div>

        {/* Demo Login Options (Rule 6) */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <button
            onClick={() => handleDemoLogin("admin")}
            className="btn btn-xs rounded-full bg-neutral/5 border-none text-[9px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
          >
            Demo Admin
          </button>
          <button
            onClick={() => handleDemoLogin("student")}
            className="btn btn-xs rounded-full bg-neutral/5 border-none text-[9px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
          >
            Demo Student
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="form-control w-full">
            <label className="label font-black text-[10px] uppercase tracking-widest opacity-40 ml-2">
              Email Address
            </label>
            <div className="relative group">
              <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors text-xl" />
              <input
                type="email"
                placeholder="example@mail.com"
                {...register("email", { required: "Email is required" })}
                className="input w-full pl-14 h-16 rounded-[1.5rem] bg-base-200/50 border-base-300 focus:border-primary focus:bg-base-100 transition-all font-bold text-sm"
              />
            </div>
            {errors.email && (
              <span className="text-error text-[10px] font-bold mt-1 ml-4 uppercase tracking-tighter">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label font-black text-[10px] uppercase tracking-widest opacity-40 ml-2">
              Password
            </label>
            <div className="relative group">
              <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors text-xl" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password", { required: "Password is required" })}
                className="input w-full pl-14 h-16 rounded-[1.5rem] bg-base-200/50 border-base-300 focus:border-primary focus:bg-base-100 transition-all font-bold text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-base-content/20 hover:text-primary transition-colors"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            {errors.password && (
              <span className="text-error text-[10px] font-bold mt-1 ml-4 uppercase tracking-tighter">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full h-16 rounded-[1.5rem] text-sm font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all mt-4"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Sign In Account"
            )}
          </button>
        </form>

        <div className="divider my-10 text-[10px] font-black uppercase tracking-[0.4em] opacity-20">
          Social Connect
        </div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline border-base-300 w-full h-16 rounded-[1.5rem] font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-4 hover:bg-base-200 hover:border-base-300 group transition-all"
        >
          <FcGoogle
            size={24}
            className="group-hover:scale-110 transition-transform"
          />
          <span>Continue with Google</span>
        </button>

        <p className="mt-12 text-center text-xs font-bold opacity-60 uppercase tracking-widest">
          New to the platform?{" "}
          <Link
            to="/register"
            className="text-primary font-black hover:underline underline-offset-4 ml-1"
          >
            Create Account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
