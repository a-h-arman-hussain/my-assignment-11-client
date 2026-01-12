import {
  FaLaptopCode,
  FaMicroscope,
  FaPalette,
  FaBriefcase,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Categories = () => {
  const cats = [
    {
      name: "Engineering",
      icon: <FaLaptopCode />,
      count: "1,200 Scholarships",
    },
    {
      name: "Medical Science",
      icon: <FaMicroscope />,
      count: "850 Scholarships",
    },
    {
      name: "Arts & Design",
      icon: <FaPalette />,
      count: "400 Scholarships",
    },
    {
      name: "Business Management",
      icon: <FaBriefcase />,
      count: "950 Scholarships",
    },
  ];

  return (
    // Global Rule: Consistent py-20 for section spacing
    <section className="mt-10 md:mt-16">
      <div className="container mx-auto">
        {/* Section Header - Browse by Categories */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* ১. সাব-টাইটেল (আপনার গ্লোবাল রুল অনুযায়ী) */}
            <span className="text-primary font-black tracking-[0.3em] uppercase text-[10px] md:text-xs">
              Exploration
            </span>

            {/* ২. মেইন টাইটেল - Standardized Typography (font-black + tracking-tighter) */}
            <h2 className="text-3xl md:text-5xl font-black text-base-content mt-3 uppercase tracking-tighter">
              Browse by <span className="text-primary">Categories</span>
            </h2>

            {/* ৩. ডেসক্রিপশন - থিম ফ্রেন্ডলি অপাসিটি */}
            <p className="text-base-content/60 mt-4 max-w-xl mx-auto font-medium text-sm md:text-base px-4">
              Find the perfect funding opportunity based on your field of study
              and career goals.
            </p>

            {/* ৪. ডেকোরেটিভ বার - Standardized Height (h-1.5) */}
            <div className="w-20 h-1.5 bg-primary mx-auto mt-6 rounded-full shadow-lg shadow-primary/20"></div>
          </motion.div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cats.map((cat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 bg-base-100 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all border border-base-300 group cursor-pointer text-center flex flex-col items-center"
            >
              {/* Icon with Secondary Color background for consistency */}
              <div className="text-4xl text-primary mb-6 p-5 bg-primary/5 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {cat.icon}
              </div>

              <h3 className="text-xl font-bold text-base-content mb-2 group-hover:text-primary transition-colors">
                {cat.name}
              </h3>

              <p className="text-base-content/50 font-medium text-sm">
                {cat.count}
              </p>

              {/* Subtle Indicator */}
              <div className="mt-6 w-8 h-1 bg-base-300 group-hover:w-16 group-hover:bg-primary transition-all duration-300 rounded-full"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
