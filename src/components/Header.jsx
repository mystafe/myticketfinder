import React from "react";
import Logo from "./Logo";
import Searchbar from "./Searchbar";
import LoginBar from "./LoginBar";
import { useContext } from "react";
import { AppContext } from "../context/GlobalContext";
import AdminBar from "./AdminBar";
import LogoutBar from "./LogoutBar";

function Header() {
  return (
    <>
      <div className="header">
        <Logo /> <Searchbar /> <h2>Istanbul📌</h2> <AdminBar /> <LoginBar />
        <LogoutBar />
      </div>
    </>
  );
}

export default Header;
