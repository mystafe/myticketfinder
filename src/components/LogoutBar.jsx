import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/GlobalContext";

function LogoutBar() {
  const { isLogged, isAdmin, setIsLogged, setIsAdmin } = useContext(AppContext);

  const handleLogout = () => {
    //will be implemented later

    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout === false) return;
    setIsLogged(false);
    setIsAdmin(false);
    localStorage.removeItem("login");
  };

  return (
    <div className={`logoutbar ${isLogged ? "display" : "hide"}`}>
      <button
        onClick={() => {
          handleLogout();
        }}
      >
        Logout {isAdmin ? "admin" : "regular"}
        {console.log("is ADmin???", isAdmin)}
        {console.log("is logged???", isLogged)}
      </button>
    </div>
  );
}

export default LogoutBar;
