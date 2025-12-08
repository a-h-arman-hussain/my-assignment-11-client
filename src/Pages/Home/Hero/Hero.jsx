import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Hero = () => {
  const { register, watch, handleSubmit } = useForm();
  const query = watch("search", ""); // watch search input
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // Fetch suggestions from server whenever query changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await axiosSecure.get(`/all-scholarships?search=${query}`);
        setSuggestions(res.data.slice(0, 5)); // top 5
      } catch (err) {
        console.log(err);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [query, axiosSecure]);

  const onSearch = (data) => {
    if (!data.search.trim()) return;
    navigate(`/all-scholarships?search=${encodeURIComponent(data.search)}`);
  };

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-purple-700 to-purple-900 flex items-center">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center px-6 md:px-16">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
            Unlock Your Future with{" "}
            <span className="text-yellow-400">Global Scholarships</span>
          </h1>
          <p className="text-gray-200 text-lg md:text-xl mb-6">
            Explore thousands of scholarships worldwide. Apply easily, get
            funded, and achieve your dreams.
          </p>

          {/* Search Form */}
          <form
            onSubmit={handleSubmit(onSearch)}
            className="relative max-w-md mx-auto md:mx-0 mb-6"
          >
            <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden">
              <input
                type="text"
                {...register("search")}
                placeholder="Search Scholarship"
                className="flex-1 px-6 py-3 focus:outline-none  text-gray-800 placeholder-gray-400 transition"
              />
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-bold px-6 py-3 rounded-full transition-shadow shadow-md hover:shadow-xl cursor-pointer"
              >
                Search
              </button>
            </div>
          </form>

          <p className="text-gray-200 text-sm md:text-base">
            Search by university, scholarship name, or category.
          </p>
        </div>

        {/* Right Image */}
        <div className="flex-1 mb-10 md:mb-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
            alt="Scholarship Hero"
            className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
          />
        </div>
      </div>

      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-purple-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
    </section>
  );
};

export default Hero;
