import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FaUserPlus } from "react-icons/fa";
import axios from "axios";
import { imageUpload } from "../../utils";

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

  // const onSubmit = async (data) => {
  //   try {
  //     const result = await registerUser(data.email, data.password);
  //     const imageFile = image[0];
  //     const formData = new FormData();
  //     formData.append("image", imageFile);

  //     const imgData = await axios.post(
  //       `https://api.imgbb.com/1/upload?key=${
  //         import.meta.env.VITE_IMGBB_API_KEY
  //       }`,
  //       formData
  //     );

  //     console.log(imgData);

  //     await updateUserProfile({
  //       displayName: data.name,
  //       photo: data.photo,
  //     });

  //     const savedUser = {
  //       name: data.name,
  //       email: data.email,
  //       photo: data.photo,
  //       role: "Student",
  //     };

  //     await axiosSecure.post("/users", savedUser);

  //     Swal.fire({
  //       title: "Registration Successful!",
  //       text: "Your account has been created successfully.",
  //       icon: "success",
  //       background: "var(--color-base-200)",
  //       color: "var(--color-neutral)",
  //       confirmButtonColor: "var(--color-primary)",
  //       confirmButtonText: "Continue",
  //     });

  //     navigate("/");
  //     reset();
  //   } catch (err) {
  //     Swal.fire({
  //       title: "Error!",
  //       text: err.message,
  //       icon: "error",
  //       background: "var(--color-base-200)",
  //       color: "var(--color-neutral)",
  //       confirmButtonColor: "var(--color-error)",
  //     });
  //   }
  // };

  const onSubmit = async (data) => {
    try {
      //  Register user
      const result = await registerUser(data.email, data.password);

      //  Get image file correctly
      const imageFile = data.photo[0];

      //  Upload to imgBB
      const imageUrl = await imageUpload(imageFile);

      //  Update Firebase profile
      await updateUserProfile({
        displayName: data.name,
        photoURL: imageUrl,
      });

      //  Save user to DB
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

          {/* Photo URL */}
          <div>
            <label className="font-medium text-muted">Photo</label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="w-full bg-base-100 border border-base-300 rounded-lg file-input mt-1 focus:outline-none focus:border-primary"
              placeholder="Your Photo"
            />
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
              placeholder="Your Password"
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
