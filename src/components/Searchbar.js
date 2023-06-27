import React from "react";

function Searchbar() {
  return (
    <div className="searchbar">
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
