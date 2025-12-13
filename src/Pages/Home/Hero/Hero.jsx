import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import heroImg from "../../../assets/Oxford (Inglaterra) 🏴______.jpeg";

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
        <div className="flex-1 text-center md:text-left w-full max-w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-base-100 leading-snug break-words">
            Unlock Your Future with{" "}
            <span className="text-yellow-400">Global Scholarships</span>
          </h1>

          <p className="text-base-200 text-sm sm:text-base md:text-lg mb-4 break-words">
            Explore thousands of scholarships worldwide. Apply easily, get
            funded, and achieve your dreams.
          </p>

          {/* Search Form */}
          <form
            onSubmit={handleSubmit(onSearch)}
            className="relative w-full max-w-md mx-auto md:mx-0"
          >
            <div className="flex items-center bg-base-100 rounded-full shadow-lg overflow-hidden border border-base-300 transition w-full">
              <input
                type="text"
                {...register("search")}
                placeholder="Search Scholarship"
                className="flex-1 px-3 sm:px-4 h-11 sm:h-12 md:h-14 text-neutral placeholder-muted focus:outline-none text-sm sm:text-base"
              />

              <button
                type="submit"
                className="h-11 sm:h-12 md:h-14 px-3 sm:px-4 md:px-6 bg-primary hover:bg-secondary 
                text-base-100 font-bold rounded-full transition transform hover:scale-105 
                shadow-md hover:shadow-lg text-xs sm:text-sm md:text-base whitespace-nowrap cursor-pointer"
              >
                Search
              </button>
            </div>

            {suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 mt-1 bg-base-100 rounded-xl shadow-lg border border-base-300 z-50 max-h-60 overflow-y-auto">
                {suggestions.map((s) => (
                  <li
                    key={s._id}
                    className="px-3 py-2 cursor-pointer hover:bg-primary/20 transition text-neutral text-sm sm:text-base"
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

          <p className="mt-2 text-base-200/50 text-xs sm:text-sm break-words">
            Search by university, scholarship name, or category.
          </p>
        </div>

        {/* Right Image */}
        <div className="flex-1 mb-10 md:mb-0">
          <img
            src={heroImg}
            alt="Scholarship Hero"
            className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
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
