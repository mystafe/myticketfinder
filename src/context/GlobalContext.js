import React, { createContext } from "react";
import { useState } from "react";

export const AppContext = createContext();

const AppContextProver = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  return (
    <AppContext.Provider value={{ favorites }}>{children}</AppContext.Provider>
  );
};
export default AppContextProver;
