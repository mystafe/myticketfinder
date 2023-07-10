import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/GlobalContext";

function Searchbar() {
  const [query, setQuery] = useState("");
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  console.log();
  return (
    <div className="searchbar">
      <input
        className="searchinput"
        type="text"
        placeholder="Search.."
        name="search"
        onChange={(event) => setQuery(event.target.value)}
      />
      <div
        className="button btn-search"
        onClick={() => {
          setIsSearchClicked(!isSearchClicked);
          localStorage.setItem("query", query);
        }}
      >
        Search
      </div>
    </div>
  );
}

export default Searchbar;
