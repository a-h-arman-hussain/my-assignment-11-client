import React from "react";
import arman from "../../assets/arman.jpg";
import saim from "../../assets/saim.jpg";
import raihan from "../../assets/raihan.jpg";
import { motion } from "framer-motion";

export default function AboutPage() {
  // Global Rule: Consistent Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen text-base-content py-6">
      {/* Heading Section - About Page */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="text-center mb-12"
      >
        {/* ১. সাব-টাইটেল: ব্র্যান্ডের মূল পরিচয় */}
        <span className="text-primary font-black tracking-[0.3em] uppercase text-[10px] md:text-xs">
          Our Mission & Vision
        </span>

        {/* ২. মেইন টাইটেল: Standardized Typography (font-black + tracking-tighter) */}
        <h1 className="text-4xl md:text-6xl font-black text-base-content mt-3 uppercase tracking-tighter">
          About <span className="text-primary">ScholarStream</span>
        </h1>

        {/* ৩. ডেসক্রিপশন: প্রফেশনাল রিডেবিলিটি এবং থিম-ফ্রেন্ডলি অপাসিটি */}
        <p className="text-base-content/60 mt-5 text-sm md:text-lg leading-relaxed max-w-3xl mx-auto px-4 font-medium">
          Welcome to our platform, where we connect passionate learners with
          global opportunities. Our mission is to provide accessible,
          high-quality scholarship information that empowers students to achieve
          their academic dreams.
        </p>

        {/* ৪. ডেকোরেটিভ বার: ইউনিফাইড ডিজাইন */}
        <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mt-8 shadow-lg shadow-primary/20"></div>
      </motion.div>

      {/* Highlight Cards - Global Rule: Consistent Border Radius [2rem] */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 md:mb-16">
        {[
          {
            title: "Our Mission",
            desc: "To simplify the scholarship search process and guide students towards the best academic opportunities.",
            color: "bg-primary/5",
          },
          {
            title: "Our Vision",
            desc: "A world where every student has equal access to educational resources and opportunities globally.",
            color: "bg-secondary/5",
          },
          {
            title: "Our Values",
            desc: "Transparency, accessibility, and a commitment to empowering students at every step.",
            color: "bg-accent/5",
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -10 }}
            className={`p-10 ${item.color} rounded-[2rem] border border-base-300 shadow-sm transition-all`}
          >
            <h3 className="text-2xl font-bold text-primary mb-4">
              {item.title}
            </h3>
            <p className="text-base-content/70 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Team Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* ১. সাব-টাইটেল: প্রফেশনাল টিম এপ্রোচ */}
          <span className="text-primary font-black tracking-[0.3em] uppercase text-[10px] md:text-xs">
            The Minds Behind
          </span>

          {/* ২. মেইন টাইটেল: Standardized Typography */}
          <h2 className="text-3xl md:text-5xl font-black text-base-content mt-3 uppercase tracking-tighter">
            Meet the <span className="text-primary">Team</span>
          </h2>

          {/* ৩. ডেসক্রিপশন: থিম ফ্রেন্ডলি অপাসিটি এবং ফন্ট ব্যালেন্স */}
          <p className="text-base-content/60 mt-4 max-w-xl mx-auto font-medium text-sm md:text-base px-6 leading-relaxed">
            Our team is built with dedicated developers and researchers working
            together to make scholarship access easier for everyone.
          </p>

          {/* ৪. ডেকোরেটিভ বার: ইউনিফাইড হাইট ও শ্যাডো */}
          <div className="w-20 h-1.5 bg-primary mx-auto mt-6 rounded-full shadow-lg shadow-primary/20"></div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10  mb-4 md:mb-8">
        {[
          {
            name: "A H Arman Hussain",
            role: "Founder & Lead Developer",
            img: arman,
          },
          {
            name: "Abdul Karim Saim",
            role: "Research Specialist",
            img: saim,
          },
          {
            name: "Mesbah Uddin Raihan",
            role: "UI/UX Designer",
            img: raihan,
          },
        ].map((member, idx) => (
          <motion.div
            key={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { delay: idx * 0.1 },
              },
            }}
            className="group flex flex-col items-center text-center bg-base-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl border border-base-300 transition-all"
          >
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-primary rounded-full scale-110 blur-md opacity-0 group-hover:opacity-20 transition-all"></div>
              <img
                src={member.img}
                alt={member.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-primary/10 group-hover:border-primary transition-all relative z-10"
              />
            </div>
            <h3 className="text-xl font-bold text-base-content group-hover:text-primary transition-colors italic">
              {member.name}
            </h3>
            <p className="text-primary font-semibold text-sm mt-1">
              {member.role}
            </p>

            <div className="mt-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-all">
              <div className="w-8 h-8 rounded-full bg-base-200 flex items-center justify-center text-primary text-xs font-bold uppercase tracking-tighter">
                In
              </div>
              <div className="w-8 h-8 rounded-full bg-base-200 flex items-center justify-center text-primary text-xs font-bold uppercase tracking-tighter">
                Fb
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
