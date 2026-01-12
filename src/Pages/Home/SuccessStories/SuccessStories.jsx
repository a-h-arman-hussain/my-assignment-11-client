import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const successStoriesData = [
  {
    id: 1,
    name: "Alice Johnson",
    university: "Harvard University",
    scholarship: "Global Excellence Scholarship",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    story:
      "Thanks to this scholarship, I could pursue my master's degree at Harvard without financial stress. It completely changed my career path!",
  },
  {
    id: 2,
    name: "Rahim Uddin",
    university: "Stanford University",
    scholarship: "Tech Innovators Fund",
    photo: "https://randomuser.me/api/portraits/men/46.jpg",
    story:
      "Getting this scholarship allowed me to focus on research and innovation. I highly recommend this platform to aspiring students.",
  },
  {
    id: 3,
    name: "Maria Lopez",
    university: "Oxford University",
    scholarship: "Global Leaders Scholarship",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    story:
      "The application process was smooth, and the support I received was excellent. Today, I am studying my dream course in Oxford!",
  },
];

const SuccessStories = () => {
  return (
    <section className="mt-10 md:mt-16">
      <div className="container mx-auto">
        {/* Standardized Header Section */}
        <div className="text-center mb-12 flex flex-col items-center">
          {/* ১. সাব-টাইটেল: প্রাইমারি কালার + স্পেসিং */}
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-black tracking-[0.3em] uppercase text-[10px] md:text-xs"
          >
            Testimonials
          </motion.span>

          {/* ২. মেইন টাইটেল: ডাইনামিক বেস-কন্টেন্ট কালার + বোল্ড ট্র্যাকিন */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-base-content mt-3 uppercase tracking-tighter"
          >
            Inspiring <span className="text-primary">Success Stories</span>
          </motion.h2>

          {/* ৩. ডেকোরেটিভ বার: ডাইনামিক প্রাইমারি ব্যাকগ্রাউন্ড */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }} // w-24
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-1.5 bg-primary rounded-full mt-5 shadow-lg shadow-primary/20"
          ></motion.div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {successStoriesData.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-base-100 p-8 rounded-3xl shadow-sm border border-base-300 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between"
            >
              {/* Quote Icon Background */}
              <div className="absolute top-6 right-8 text-primary/10 group-hover:text-primary/20 transition-colors">
                <FaQuoteLeft size={40} />
              </div>

              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <img
                      src={story.photo}
                      alt={story.name}
                      className="w-16 h-16 rounded-2xl object-cover ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-success w-5 h-5 rounded-full border-4 border-base-100"></div>
                  </div>
                  <div>
                    <h3 className="text-base-content font-bold text-lg leading-tight">
                      {story.name}
                    </h3>
                    <p className="text-primary text-sm font-medium">
                      {story.university}
                    </p>
                  </div>
                </div>

                <p className="text-base-content/70 italic leading-relaxed relative z-10">
                  "{story.story}"
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-base-200">
                <p className="text-xs text-base-content/40 uppercase tracking-wider font-bold mb-2">
                  Awarded
                </p>
                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-xl text-xs font-bold border border-primary/10">
                  {story.scholarship}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
