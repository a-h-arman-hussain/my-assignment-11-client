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
        background: "var(--color-base-200)",
        color: "var(--color-neutral)",
        confirmButtonColor: "var(--color-primary)",
      });

      navigate("/");
    } catch (err) {
      Swal.fire({
        title: "Login Failed!",
        text: err.message,
        icon: "error",
        background: "var(--color-base-200)",
        color: "var(--color-neutral)",
        confirmButtonColor: "var(--color-error)",
      });
    }
  };

  // Google Login + DB save
  const handleGoogleLogin = async () => {
    try {
      const result = await signInGoogle();
      const user = result.user;
      const token = await user.getIdToken();
      localStorage.setItem("fb-token", token);

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
        title: "Google Login Successful 🔥",
        text: existingUser
          ? "Welcome back to ScholarStream!"
          : "Account created & logged in successfully!",
        icon: "success",
        background: "var(--color-base-200)",
        color: "var(--color-neutral)",
        confirmButtonColor: "var(--color-primary)",
      });

      navigate("/");
    } catch (err) {
      Swal.fire({
        title: "Google Login Failed!",
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
      <div className="w-full max-w-md bg-base-100/80 backdrop-blur-lg p-5 md:p-8 rounded-2xl shadow-2xl border border-base-300">
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
              {...register("password", { required: "Password is required" })}
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
            className="w-full bg-primary hover:bg-primary/90 text-base-100 p-3 rounded-lg font-semibold transition shadow-md"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted mb-3">Or login with</p>
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-secondary hover:bg-secondary/90 text-base-100 p-3 rounded-lg font-semibold transition shadow-md"
          >
            Google Login
          </button>
        </div>

        <p className="mt-6 text-center text-muted">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-accent font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
