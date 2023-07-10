import React from "react";
import { createContext, useEffect, useState } from "react";
import { get } from "react-cool-form";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(
    get(() => localStorage.getItem("login").length > 0)
  );
  const [isAdmin, setIsAdmin] = useState(
    get(() => localStorage.getItem("login")) === "admin"
  );

  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [query, setQuery] = useState("");
  // const [isLogged, setIsLogged] = useState(true);
  // const [isAdmin, setIsAdmin] = useState(true);

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
  const fetchEvent = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://localhost:7169/api/event/");
      setAllEvents(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  useEffect(() => {
    setIsAdmin(localStorage.getItem("login") === "admin");
    setIsLogged(localStorage.getItem("login")?.length > 0);
  }, [localStorage.getItem("login")]);

  useEffect(() => {
    setQuery(localStorage.getItem("query"));
  }, [localStorage.getItem("query")]);

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
        isSearchClicked,
        setIsSearchClicked,
        query,
        setQuery,
        fetchEvent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
