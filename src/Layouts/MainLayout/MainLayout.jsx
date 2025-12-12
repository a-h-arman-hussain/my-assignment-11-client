import React from "react";
import Navbar from "../../Pages/Shared/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../../Pages/Shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="bg-base-200 text-neutral min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-base-100 shadow-md border-b border-base-300">
        <Navbar />
      </header>

      <main className="flex-grow max-w-11/12 mx-auto">
        <Outlet />
      </main>

      <footer className="bg-base-100 border-t border-base-300 mt-10">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
