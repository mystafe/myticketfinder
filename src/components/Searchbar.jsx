import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/GlobalContext";

function Searchbar() {
  return (
    <div className="searchbar">
      <input
        className="searchinput"
        type="text"
        placeholder="Search.."
        name="search"
      />
      <div className="button btn-search">Search</div>
    </div>
  );
}

export default Searchbar;
