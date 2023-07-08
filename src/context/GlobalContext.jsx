import React from "react";
import { createContext, useEffect, useState } from "react";
import { get } from "react-cool-form";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  // const [isLogged, setIsLogged] = useState(
  //   get(() => localStorage.getItem("login").length > 0)
  // );
  // const [isAdmin, setIsAdmin] = useState(
  //   get(() => localStorage.getItem("login")) === "admin"
  // );

  const [isLogged, setIsLogged] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);

  const [loading, setLoading] = useState(true);
  const [allCountries, setAllCountries] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [allAddresses, setAllAddresses] = useState([]);
  const [allPlaces, setAllPlaces] = useState([]);
  const [allStages, setAllStages] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [allEventImages, setAllEventImages] = useState([]);
  const [allRatings, setAllRatings] = useState([]);
  const [allEventStages, setAllEventStages] = useState([]);
  const [allTickets, setAllTickets] = useState([]);
  const [allEventSeats, setAllEventSeats] = useState([]);
  const [allSeats, setAllSeats] = useState([]);

  // useEffect(() => {
  //   setIsAdmin(localStorage.getItem("login") === "admin");
  //   setIsLogged(localStorage.getItem("login")?.length > 0);
  // }, [localStorage.getItem("login")]);

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        allCountries,
        setAllCountries,
        allCities,
        setAllCities,
        allAddresses,
        setAllAddresses,
        allPlaces,
        setAllPlaces,
        allStages,
        setAllStages,
        allCustomers,
        setAllCustomers,
        allEvents,
        setAllEvents,
        allEventImages,
        setAllEventImages,
        allRatings,
        setAllRatings,
        allEventStages,
        setAllEventStages,
        allTickets,
        setAllTickets,
        allEventSeats,
        setAllEventSeats,
        allSeats,
        setAllSeats,
        isAdmin,
        setIsAdmin,
        isLogged,
        setIsLogged,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
