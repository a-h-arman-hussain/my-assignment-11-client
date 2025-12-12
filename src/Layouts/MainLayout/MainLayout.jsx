import React from "react";
import Navbar from "../../Pages/Shared/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../../Pages/Shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="bg-base-200 text-neutral min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-primary/10 shadow-md backdrop-blur-xl">
        <Navbar />
      </header>

      <main className="flex-grow max-w-11/12 mx-auto">
        <Outlet />
      </main>

      <footer className="bg-neutral border-t border-base-300">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
