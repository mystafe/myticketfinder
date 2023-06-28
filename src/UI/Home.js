import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="home">
      <Header />
      <Navbar />
      <Main />

      <Footer />
    </div>
  );
}

export default Home;
