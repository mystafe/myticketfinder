import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/GlobalContext";

function LoginBar() {
  const { isLogged, setIsLogged, setIsAdmin } = useContext(AppContext);

  const handleRegularUserLogin = () => {
    setIsLogged(true);
    setIsAdmin(false);
    localStorage.setItem("login", "regular");
    alert("Yine geldi regular user!");
  };

  const handleAdminLogin = () => {
    //will be implemented later

    setIsLogged(true);
    setIsAdmin(true);
    localStorage.setItem("login", "admin");
    alert("Admin mekana giriş yaptı!");
  };

  return (
    <div className={`loginbar ${isLogged ? "hide" : "display"}`}>
      <button
        onClick={() => {
          handleRegularUserLogin();
        }}
      >
        Login as regular
      </button>
      <button
        onClick={() => {
          handleAdminLogin();
        }}
      >
        Login as admin
      </button>
    </div>
  );
}

export default LoginBar;
