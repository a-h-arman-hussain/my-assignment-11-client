import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
// import axiosSecure from "../../hooks/useAxiosSecure";

export default function Login() {
  const { signInUser, signInGoogle } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await signInUser(data.email, data.password);

      //  get JWT from server (if implemented)
      // const res = await axiosSecure.post("/jwt", { email: data.email });
      // localStorage.setItem("access-token", res.data.token);

      alert("Login Successful!");
      navigate("/"); 
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  // Google login handler
  const handleGoogleLogin = async () => {
    try {
      await signInGoogle();
      alert("Login with Google Successful!");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert(err.message);
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
          <a href="/register" className="text-purple-500 font-semibold">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
