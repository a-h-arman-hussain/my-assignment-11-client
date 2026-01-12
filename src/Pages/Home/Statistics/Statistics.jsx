import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Statistics = () => {
  // triggerOnce: true রাখা হয়েছে যাতে এনিমেশন একবারই হয়
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const stats = [
    { id: 1, label: "Global Scholarships", value: 5000, suffix: "+" },
    { id: 2, label: "Success Stories", value: 12000, suffix: "+" },
    { id: 3, label: "Partner Universities", value: 150, suffix: "+" },
    { id: 4, label: "Funding Distributed", value: 25, suffix: "M+" },
  ];

  return (
    // Global UI Rule: Consistent padding (py-20) and spacing (my-12)
    <section ref={ref} className="mt-10 md:mt-16">
      <div className="container mx-auto">
        {/* Statistics Card Container */}
        <div className="bg-primary rounded-[2rem] p-10 md:p-16 shadow-xl relative overflow-hidden">
          {/* Decorative Background Pattern (Optional but improves design) */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white"></path>
            </svg>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center relative z-10">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col items-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3">
                  {inView ? (
                    <CountUp end={stat.value} duration={2.5} separator="," />
                  ) : (
                    "0"
                  )}
                  {stat.suffix}
                </h2>

                {/* Global UI Rule: Proper contrast in dark mode using primary-content */}
                <p className="text-primary-content/90 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                  {stat.label}
                </p>

                {/* Subtle Divider for Mobile */}
                <div className="w-10 h-1 bg-secondary/50 rounded-full mt-4 md:hidden"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
