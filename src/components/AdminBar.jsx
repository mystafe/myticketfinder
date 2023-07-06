import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

function AdminBar() {
  const { isAdmin } = useContext(AppContext);

  return (
    <div className={`adminbar  ${isAdmin ? "display" : "hide"}`}>
      <Link to="/admin">Admin paneli</Link>
    </div>
  );
}

export default AdminBar;
