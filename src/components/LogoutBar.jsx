import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/GlobalContext";

function LogoutBar() {
  const { isLogged, isAdmin, setIsLogged, setIsAdmin } = useContext(AppContext);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout === false) return;
    setIsLogged(false);
    setIsAdmin(false);
    localStorage.removeItem("login");
  };

  return (
    isLogged && (
      <div className={`logoutbar`}>
        <div
          className="btn-logout"
          onClick={() => {
            handleLogout();
          }}
        >
          Logout {isAdmin ? "admin" : isLogged ? "regular" : ""}
        </div>
      </div>
    )
  );
}

export default LogoutBar;
