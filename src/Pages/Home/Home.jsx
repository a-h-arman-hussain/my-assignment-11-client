import React from "react";
import Hero from "./Hero/Hero";
import LatestScholarships from "./LatestScholarships/LatestScholarships";
import SuccessStories from "./SuccessStories/SuccessStories";
import Testimonials from "./Testimonials/Testimonials";
import Statistics from "./Statistics/Statistics";
import Categories from "./Categories/Categories";
import Steps from "./Steps/Steps";
import Newsletter from "./Newsletter/Newsletter";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <LatestScholarships></LatestScholarships>
      <SuccessStories></SuccessStories>
      <Testimonials></Testimonials>
      <Statistics></Statistics>
      <Categories></Categories>
      <Steps></Steps>
      <Newsletter></Newsletter>
    </div>
  );
};

export default Home;
