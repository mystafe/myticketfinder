import React, { useContext } from "react";

import { AppContext } from "../context/GlobalContext";

function AdminPageNew() {
  const { loading, setIsLogged, setIsAdmin, isAdmin, isLogged } =
    useContext(AppContext);

  const myCountries = [
    { id: 1, name: "Turkiye" },
    { id: 2, name: "Germany" },
    { id: 3, name: "France" },
  ];

  console.log("IS ADMIN", isAdmin);
  console.log("IS LOGGED", isLogged);

  const handleLogin = () => {
    isAdmin ? setIsAdmin(false) : setIsAdmin(true);
    isLogged ? setIsLogged(false) : setIsLogged(true);
  };

  return (
    <div>
      Admin Page New Count: {myCountries.length} - Favorite:
      {false ? (
        <div>Loading...</div>
      ) : (
        myCountries.map((country) => (
          <div key={country.id}>
            <h1>{country.name}</h1>

            <button
              onClick={() => {
                alert("clicked+ " + country.name);
                handleLogin();
              }}
            >
              Click me
            </button>
          </div>
        ))
      )}
    </div>
  );
}
export default AdminPageNew;
