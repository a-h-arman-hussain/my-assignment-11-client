import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash, FaUserPlus } from "react-icons/fa";
import { imageUpload } from "../../utils";

export default function Register() {
  const { registerUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await registerUser(data.email, data.password);

      const imageFile = data.photo[0];

      const imageUrl = await imageUpload(imageFile);

      //  Update profile
      await updateUserProfile({
        displayName: data.name,
        photoURL: imageUrl,
      });

      //  Save user
      const savedUser = {
        name: data.name,
        email: data.email,
        photo: imageUrl,
        role: "Student",
      };

      await axiosSecure.post("/users", savedUser);

      Swal.fire({
        title: "Registration Successful!",
        icon: "success",
      });

      reset();
      navigate("/");
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: err.message,
        icon: "error",
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
              placeholder="Your Name"
            />
            {errors.name && (
              <p className="text-error text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Photo */}
          <div>
            <label className="font-medium text-muted">Photo</label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="w-full bg-base-100 border border-base-300 rounded-lg file-input mt-1 focus:outline-none focus:border-primary"
              placeholder="Your Photo"
            />
            {errors.photo && (
              <p className="text-error text-sm mt-1">Photo is required</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="font-medium text-muted">Email Address</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-3 bg-base-100 border border-base-300 rounded-lg text-neutral mt-1 focus:outline-none focus:border-primary"
              placeholder="Your Email"
            />
            {errors.email && (
              <p className="text-error text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="font-medium text-muted">Password</label>

            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full p-3 pr-10 bg-base-100 border border-base-300 rounded-lg text-neutral focus:outline-none focus:border-primary"
                placeholder="Your Password"
              />

              {/* Eye Icon */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral/70 hover:text-primary cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

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
