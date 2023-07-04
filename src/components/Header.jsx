import React from "react";
import Logo from "./Logo";
import Searchbar from "./Searchbar";
import Login from "./Login";
import Register from "./Register";

function Header() {
  return (
    <>
      <div className="header">
        <Logo /> <Searchbar /> Istanbul 📌 <Login /> <Register />
      </div>
    </>
  );
}

export default Header;
