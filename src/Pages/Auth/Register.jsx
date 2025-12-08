import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

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

      //  Update Profile
      await updateUserProfile({
        displayName: data.name,
        photoURL: data.photo,
      });

      // Save user to database with default role
      const savedUser = {
        name: data.name,
        email: data.email,
        photo: data.photo,
        role: "Student",
      };

      await axiosSecure.post("/users", savedUser);

      alert("Registration Successful!");
      navigate("/");
      reset();
    } catch (err) {
      console.log(err);
      alert(err.message);
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
      </div>
    </div>
  );
}
