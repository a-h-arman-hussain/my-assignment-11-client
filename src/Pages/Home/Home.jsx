import React from "react";
import Hero from "./Hero/Hero";
import LatestScholarships from "./LatestScholarships/LatestScholarships";
import SuccessStories from "./SuccessStories/SuccessStories";
import Testimonials from "./Testimonials/Testimonials";
import ContactUs from "./ContactUs/ContactUs";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <LatestScholarships></LatestScholarships>
      <SuccessStories></SuccessStories>
      <Testimonials></Testimonials>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
