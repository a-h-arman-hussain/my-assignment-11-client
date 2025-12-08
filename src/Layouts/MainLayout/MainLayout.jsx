import React from "react";
import Navbar from "../../Pages/Shared/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../../Pages/Shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <header className="sticky top-0 z-50">
        <Navbar></Navbar>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer><Footer></Footer></footer>
    </div>
  );
};

export default MainLayout;
