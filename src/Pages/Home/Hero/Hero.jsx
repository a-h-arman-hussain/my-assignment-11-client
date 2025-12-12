import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Hero = () => {
  const { register, watch, handleSubmit } = useForm();
  const query = watch("search", "");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await axiosSecure.get(`/all-scholarships?search=${query}`);
        setSuggestions(res.data.slice(0, 5));
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
    <section className="mt-0 relative w-full md:h-[400px] bg-gradient-to-br from-primary to-secondary flex items-center rounded-b-2xl py-10">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center px-6 md:px-16">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-base-100 leading-tight">
            Unlock Your Future with{" "}
            <span className="text-yellow-400">Global Scholarships</span>
          </h1>

          <p className="text-base-200 text-md md:text-lg mb-6">
            Explore thousands of scholarships worldwide. Apply easily, get
            funded, and achieve your dreams.
          </p>

          {/* Search Form */}
          <form
            onSubmit={handleSubmit(onSearch)}
            className="relative max-w-md mx-auto md:mx-0"
          >
            <div className="flex items-center bg-base-100 rounded-full shadow-lg overflow-hidden border border-base-300 transition">
              <input
                type="text"
                {...register("search")}
                placeholder="Search Scholarship"
                className="flex-1 px-6 py-3 text-neutral placeholder-muted focus:outline-none  rounded-full transition"
              />
              <button
                type="submit"
                className="bg-accent hover:bg-secondary text-base-100 font-bold px-6 py-3 rounded-full transition transform hover:scale-105 shadow-md hover:shadow-lg cursor-pointer"
              >
                Search
              </button>
            </div>

            {/* Suggestions dropdown */}
            {suggestions.length > 0 && (
              <ul className="absolute top-full mt-1 w-full bg-base-100 rounded-xl shadow-lg border border-base-300 z-50">
                {suggestions.map((s) => (
                  <li
                    key={s._id}
                    className="px-4 py-2 cursor-pointer hover:bg-primary/20 transition text-neutral"
                    onClick={() =>
                      navigate(
                        `/all-scholarships?search=${encodeURIComponent(
                          s.scholarshipName
                        )}`
                      )
                    }
                  >
                    {s.scholarshipName} - {s.universityName}
                  </li>
                ))}
              </ul>
            )}
          </form>

          <p className="ml-3 text-base-200/50">
            Search by university, scholarship name, or category.
          </p>
        </div>

        {/* Right Image */}
        <div className="flex-1 mb-10 md:mb-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
            alt="Scholarship Hero"
            className="w-full max-w-md mx-auto rounded-2xl shadow-2xl border border-base-300"
          />
        </div>
      </div>

      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
    </section>
  );
};

export default Hero;
