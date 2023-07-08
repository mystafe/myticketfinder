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
    !isLogged && (
      <div className="loginbar">
        <div
          className="btn-login btn-regular-login"
          onClick={() => {
            handleRegularUserLogin();
          }}
        >
          Login as regular
        </div>
        <btn
          className="btn-login btn-admin-login"
          onClick={() => {
            handleAdminLogin();
          }}
        >
          Login as admin
        </btn>
      </div>
    )
  );
}

export default LoginBar;
