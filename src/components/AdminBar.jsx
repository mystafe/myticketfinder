import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

function AdminBar() {
  const { isAdmin } = useContext(AppContext);

  return (
    isAdmin && (
      <div className="adminbar">
        <div className="btn-admin">
          <Link to="/admin">Admin paneli</Link>
        </div>
      </div>
    )
  );
}

export default AdminBar;
