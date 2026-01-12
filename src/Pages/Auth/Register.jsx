import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiCamera,
  FiUserPlus,
} from "react-icons/fi";
import { imageUpload } from "../../utils";
import { motion } from "framer-motion";

export default function Register() {
  const { registerUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // ফটো প্রিভিউ হ্যান্ডলার
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // ১. ইউজার রেজিস্ট্রেশন
      const result = await registerUser(data.email, data.password);

      // ২. ইমেজ আপলোড
      const imageFile = data.photo[0];
      const imageUrl = await imageUpload(imageFile);

      // ৩. প্রোফাইল আপডেট
      await updateUserProfile({
        displayName: data.name,
        photoURL: imageUrl,
      });

      // ৪. ডাটাবেসে ইউজার সেভ করা
      const savedUser = {
        name: data.name,
        email: data.email,
        photo: imageUrl,
        role: "Student",
      };

      await axiosSecure.post("/users", savedUser);

      Swal.fire({
        title: "Registration Successful!",
        text: "Welcome to our platform",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        customClass: { popup: "rounded-[2rem]" },
      });

      reset();
      navigate("/");
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Registration Failed!",
        text: err.message,
        icon: "error",
        customClass: { popup: "rounded-[2rem]" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-base-100/80 backdrop-blur-2xl p-8 md:p-14 rounded-[3rem] shadow-2xl border border-base-300 relative z-10"
      >
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">
            Create <span className="text-primary">Account</span>
          </h2>
          <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.3em] mt-3">
            Join us and explore world-class scholarships
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Full Name */}
          <div className="form-control">
            <label className="label font-black text-[10px] uppercase tracking-widest opacity-40 ml-2">
              Full Name
            </label>
            <div className="relative group">
              <FiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors text-xl" />
              <input
                type="text"
                placeholder="John Doe"
                {...register("name", { required: "Name is required" })}
                className="input w-full pl-14 h-16 rounded-[1.5rem] bg-base-200/50 border-base-300 focus:border-primary transition-all font-bold text-sm"
              />
            </div>
            {errors.name && (
              <span className="text-error text-[10px] font-bold mt-1 ml-4 uppercase">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email Address */}
          <div className="form-control">
            <label className="label font-black text-[10px] uppercase tracking-widest opacity-40 ml-2">
              Email Address
            </label>
            <div className="relative group">
              <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors text-xl" />
              <input
                type="email"
                placeholder="example@mail.com"
                {...register("email", { required: "Email is required" })}
                className="input w-full pl-14 h-16 rounded-[1.5rem] bg-base-200/50 border-base-300 focus:border-primary transition-all font-bold text-sm"
              />
            </div>
            {errors.email && (
              <span className="text-error text-[10px] font-bold mt-1 ml-4 uppercase">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="form-control md:col-span-2">
            <label className="label font-black text-[10px] uppercase tracking-widest opacity-40 ml-2">
              Security Password
            </label>
            <div className="relative group">
              <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors text-xl" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
                className="input w-full pl-14 h-16 rounded-[1.5rem] bg-base-200/50 border-base-300 focus:border-primary transition-all font-bold text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-base-content/20 hover:text-primary"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            {errors.password && (
              <span className="text-error text-[10px] font-bold mt-1 ml-4 uppercase">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Profile Photo Upload with Preview */}
          <div className="form-control md:col-span-2">
            <label className="label font-black text-[10px] uppercase tracking-widest opacity-40 ml-2">
              Profile Photo
            </label>
            <div className="flex items-center gap-4 p-4 bg-base-200/50 rounded-[1.5rem] border border-dashed border-base-300 group hover:border-primary transition-all">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-base-300 flex-shrink-0 border-2 border-white shadow-md">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FiCamera
                    size={24}
                    className="absolute inset-0 m-auto text-base-content/20"
                  />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                {...register("photo", { required: "Photo is required" })}
                onChange={handlePhotoChange}
                className="file-input file-input-ghost w-full font-bold text-xs"
              />
            </div>
            {errors.photo && (
              <span className="text-error text-[10px] font-bold mt-1 ml-4 uppercase">
                Photo is required
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary md:col-span-2 h-16 rounded-[1.5rem] text-sm font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all mt-4"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <span className="flex items-center gap-2">
                <FiUserPlus size={20} /> Create My Account
              </span>
            )}
          </button>
        </form>

        <p className="mt-10 text-center text-xs font-bold opacity-60 uppercase tracking-widest">
          Already a member?{" "}
          <Link
            to="/login"
            className="text-primary font-black hover:underline underline-offset-4 ml-1"
          >
            Sign In Here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
