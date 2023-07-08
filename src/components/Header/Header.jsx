import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import Searchbar from "../Searchbar";
import LoginBar from "../LoginBar";
import { useContext } from "react";
import { AppContext } from "../../context/GlobalContext";
import AdminBar from "../AdminBar";
import LogoutBar from "../LogoutBar";

function Header() {
  return (
    // <>
    //   <div className="header">
    //     <Logo /> <Searchbar /> <h2>Istanbul📌</h2> <AdminBar /> <LoginBar />
    //     <LogoutBar />
    //   </div>
    // </>

    <div id="header-navbar">
      <div className="header-header">
        <nav>
          <div className="menu">
            <ul>
              <li className="logo">
                <Link to="/">My Ticket Finder</Link>
              </li>

              <li>
                <Searchbar />
              </li>
              <li>
                <AdminBar />
              </li>
              <li>
                <LoginBar />
              </li>
              <li>
                <LogoutBar />
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
