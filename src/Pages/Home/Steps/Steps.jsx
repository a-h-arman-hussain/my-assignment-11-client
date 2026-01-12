import React from "react";
import { motion } from "framer-motion";

const Steps = () => {
  const steps = [
    {
      title: "Create Account",
      desc: "Sign up and complete your academic profile to get personalized recommendations.",
    },
    {
      title: "Find Scholarship",
      desc: "Use our AI-powered smart search to find funding that matches your goals.",
    },
    {
      title: "Apply Online",
      desc: "Submit your documents easily through our secure application portal.",
    },
  ];

  return (
    <section className="mt-10 md:mt-16">
      <div className="container mx-auto">
        {/* Section Header - How It Works */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* ১. সাব-টাইটেল: প্রসেস বা গাইড বোঝাতে */}
            <span className="text-primary font-black tracking-[0.3em] uppercase text-[10px] md:text-xs">
              Step-by-Step Guide
            </span>

            {/* ২. মেইন টাইটেল: Standardized Typography (font-black + tracking-tighter) */}
            <h2 className="text-3xl md:text-5xl font-black text-base-content mt-3 uppercase tracking-tighter">
              How It <span className="text-primary">Works</span>
            </h2>

            {/* ৩. ডেসক্রিপশন: ফন্ট ওয়েট এবং অপাসিটি ব্যালেন্সড */}
            <p className="text-base-content/60 mt-4 max-w-lg mx-auto font-medium text-sm md:text-base px-6">
              Follow these simple steps to secure your future and reach your
              academic goals.
            </p>

            {/* ৪. ডেকোরেটিভ বার: Standardized Width (w-20) & Height (h-1.5) */}
            <div className="w-20 h-1.5 bg-primary mx-auto mt-6 rounded-full shadow-lg shadow-primary/20"></div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Hidden on mobile) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-base-300 -translate-y-1/2 z-0"></div>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative z-10 bg-base-100 p-8 rounded-[2rem] border border-base-300 shadow-sm hover:shadow-xl transition-all text-center group"
            >
              {/* Step Number with Outer Ring */}
              <div className="w-20 h-20 bg-base-100 border-4 border-primary rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 transition-transform duration-300">
                <span className="text-3xl font-black text-primary">
                  0{i + 1}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-3 text-base-content group-hover:text-primary transition-colors">
                {step.title}
              </h3>

              <p className="text-base-content/60 text-sm leading-relaxed">
                {step.desc}
              </p>

              {/* Status Indicator */}
              <div className="mt-6 flex justify-center gap-1">
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i >= 0 ? "w-8 bg-primary" : "w-2 bg-base-300"
                  }`}
                ></div>
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i >= 1 ? "w-8 bg-primary" : "w-2 bg-base-300"
                  }`}
                ></div>
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i >= 2 ? "w-8 bg-primary" : "w-2 bg-base-300"
                  }`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;
