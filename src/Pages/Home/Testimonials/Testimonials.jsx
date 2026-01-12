import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";

const testimonialsData = [
  {
    id: 1,
    name: "John Doe",
    position: "Masters in CS Student",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    message:
      "This platform helped me find scholarships I never knew existed. Highly recommended!",
  },
  {
    id: 2,
    name: "Sophia Lee",
    position: "PhD Student",
    photo: "https://randomuser.me/api/portraits/women/31.jpg",
    message:
      "The scholarship applications were simple and fast. I got funded in no time!",
  },
  {
    id: 3,
    name: "Michael Smith",
    position: "MBA Student",
    photo: "https://randomuser.me/api/portraits/men/28.jpg",
    message:
      "Thanks to the guidance here, I successfully secured my dream scholarship abroad.",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const length = testimonialsData.length;

  const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1);

  // অটো-প্লে ফিচার (অপশনাল)
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <section className="mt-10 md:mt-16 overflow-hidden">
      <div className="container mx-auto text-center">
        {/* Section Header - স্টুডেন্ট ফিডব্যাক সেকশন */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* ১. সাব-টাইটেল (আগের গুলোর সাথে মিল রেখে) */}
            <span className="text-primary font-black tracking-[0.3em] uppercase text-[10px] md:text-xs">
              Testimonials
            </span>

            {/* ২. মেইন টাইটেল - Standardized Typography */}
            <h2 className="text-3xl md:text-5xl font-black text-base-content mt-3 uppercase tracking-tighter">
              What Our <span className="text-primary">Students Say</span>
            </h2>

            {/* ৩. ডেকোরেটিভ বার - Standardized Height (h-1.5) */}
            <div className="w-20 h-1.5 bg-primary mx-auto mt-5 rounded-full shadow-lg shadow-primary/20"></div>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto px-4">
          <div className="relative min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialsData[current].id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="bg-base-100 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-base-300 shadow-xl relative z-10 w-full"
              >
                {/* Quote Decoration */}
                <div className="absolute -top-0 right-5 text-primary/10">
                  <FaQuoteRight size={60} />
                </div>
                <img
                  src={testimonialsData[current].photo}
                  alt={testimonialsData[current].name}
                  className="w-20 h-20 rounded-full mx-auto mb-6 object-cover ring-4 ring-primary ring-offset-4 ring-offset-base-100 shadow-lg"
                />

                <p className="text-lg md:text-xl text-base-content/80 italic mb-8 leading-relaxed px-4">
                  "{testimonialsData[current].message}"
                </p>

                <div>
                  <h3 className="text-base-content font-bold text-xl">
                    {testimonialsData[current].name}
                  </h3>
                  <p className="text-primary font-medium">
                    {testimonialsData[current].position}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={prevSlide}
              className="btn btn-circle btn-primary btn-outline hover:!text-white shadow-lg"
              aria-label="Previous slide"
            >
              <FiChevronLeft size={24} />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {testimonialsData.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === current ? "w-8 bg-primary" : "w-2 bg-primary/30"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="btn btn-circle btn-primary btn-outline hover:!text-white shadow-lg"
              aria-label="Next slide"
            >
              <FiChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
