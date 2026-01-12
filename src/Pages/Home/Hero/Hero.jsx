import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import heroImg from "../../../assets/Oxford (Inglaterra) 🏴______.jpeg";

const Hero = () => {
  const { register, watch, handleSubmit } = useForm();
  const query = watch("search", "");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
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
    // আপনার আগের সাইজ (md:h-[400px]) ঠিক রাখা হয়েছে
    <section className="mt-0 relative w-full md:h-[400px] bg-gradient-to-br from-primary to-secondary flex items-center rounded-b-2xl py-10 overflow-hidden">
      {/* Decorative Blur Effect for Dark Mode & Design */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl opacity-30"></div>

      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center px-6 md:px-16 relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 text-center md:text-left w-full max-w-full"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-snug break-words">
            Unlock Your Future with{" "}
            <span className="text-yellow-400">Global Scholarships</span>
          </h1>

          <p className="text-white/80 text-sm sm:text-base md:text-lg mb-6 mt-2 break-words">
            Explore thousands of scholarships worldwide. Apply easily, get
            funded, and achieve your dreams.
          </p>

          {/* Search Form */}
          <form
            onSubmit={handleSubmit(onSearch)}
            className="relative w-full max-w-lg mx-auto md:mx-0 group"
          >
            <div
              className={`relative flex items-center bg-black/20 backdrop-blur-xl rounded-full transition-all duration-300 border border-white/10 overflow-hidden ${
                isFocused ? "ring-2 ring-primary/50 shadow-lg" : ""
              }`}
            >
              {/* Search Icon */}
              <div className="absolute left-5 text-white/40">
                <FiSearch size={20} />
              </div>

              {/* Search Input */}
              <input
                type="text"
                autoComplete="off"
                {...register("search")}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                placeholder="Search for scholarships..."
                className="w-full pl-14 pr-28 h-12 sm:h-14 bg-transparent text-white placeholder:text-white/30 focus:outline-none text-sm"
              />

              {/* Search Button - Absolute positioning to stay inside */}
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-6 bg-[#E98135] hover:bg-[#d0722e] text-white font-black uppercase tracking-widest text-[10px] rounded-full transition-all active:scale-95 shadow-md cursor-pointer"
              >
                SEARCH
              </button>
            </div>

            {/* Suggestions Dropdown - Modern Glassmorphism */}
            <AnimatePresence>
              {isFocused && suggestions.length > 0 && (
                <motion.ul
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute left-0 right-0 mt-4 bg-[#1a1a1a]/90 backdrop-blur-2xl rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/5 z-50 max-h-72 overflow-y-auto overflow-x-hidden p-3 custom-scrollbar"
                >
                  <div className="px-5 py-2 text-[9px] font-black uppercase tracking-[0.3em] text-primary/60">
                    Results Found
                  </div>

                  {suggestions.map((s) => (
                    <li
                      key={s._id}
                      className="px-5 py-4 cursor-pointer hover:bg-white/5 rounded-[1.5rem] transition-all flex flex-col gap-0.5 group/item"
                      onClick={() =>
                        navigate(
                          `/all-scholarships?search=${encodeURIComponent(
                            s.scholarshipName
                          )}`
                        )
                      }
                    >
                      <span className="font-black text-white text-sm group-hover/item:text-primary transition-colors truncate">
                        {s.scholarshipName}
                      </span>
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider truncate">
                        {s.universityName}
                      </span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </form>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 mb-10 md:mb-0"
        >
          <img
            src={heroImg}
            alt="Scholarship Hero"
            className="w-full max-w-[320px] md:max-w-md mx-auto rounded-2xl shadow-2xl border-4 border-white/20 object-cover"
          />
        </motion.div>
      </div>

      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-accent rounded-full mix-blend-screen filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-secondary rounded-full mix-blend-screen filter blur-3xl opacity-20"></div>
    </section>
  );
};

export default Hero;
