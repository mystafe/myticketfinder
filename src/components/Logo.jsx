import React from "react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <div className="logo">
        <img src="/purchase-power-1024.ico" alt="logo" />
        <span className="span"> My Ticker Finder</span>
      </div>
    </Link>
  );
}

export default Logo;
