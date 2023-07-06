import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/GlobalContext";

function Searchbar() {
  const { isLogged } = useContext(AppContext);
  return (
    <div className={`searchbar ${isLogged ? "display" : "hide"}`}>
      <input
        className="searchinput"
        type="text"
        placeholder="Search.."
        name="search"
      />
      <button type="submit">
        <i className="btn btn-search">Search</i>
      </button>
    </div>
  );
}

export default Searchbar;
