import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";

import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="App">
      <Header />
      {/*  <Navbar />
       */}
      <Outlet />

      <Footer />
    </div>
  );
}
export default AppLayout;
