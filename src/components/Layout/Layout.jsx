import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Layout.css"; // 👈 Import a CSS file

const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <Navbar />
      <main className={`main-wrapper ${isHome ? "no-shadow" : "with-shadow"}`}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
