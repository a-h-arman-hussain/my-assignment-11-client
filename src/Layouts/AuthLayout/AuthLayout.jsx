import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../Pages/Shared/Navbar/Navbar";
import Footer from "../../Pages/Shared/Footer/Footer";

const AuthLayout = () => {
  return (
    <div className="bg-base-200 text-neutral min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-base-100 shadow-md shadow-primary/20">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-11/12 mx-auto">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="text-neutral border-t border-base-200 mt-10">
        <Footer />
      </footer>
    </div>
  );
};

export default AuthLayout;
