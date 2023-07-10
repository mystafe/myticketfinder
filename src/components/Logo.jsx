import React from "react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <div className="logo">
        <span className="span"> My Ticker Finder</span>
      </div>
    </Link>
  );
}

export default Logo;
