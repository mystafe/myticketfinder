import React, { useEffect } from "react";
import axios from "axios";

import CreateAddress from "./CreateAddress";
import CreateCity from "./CreateCity";
import CreatePlace from "./CreatePlace";
import CreateStage from "./CreateStage";
import CreateCustomer from "./CreateCustomer";
import CreateEvent from "./CreateEvent";
import CreateEventImage from "./CreateEventImage";
import CreateRating from "./CreateRating";
import CreateEventStage from "./CreateEventStage";
import CreateTicket from "./CreateTicket";
import { useState } from "react";
import CreateCountryForm from "../components/CreateCountryForm";

function AdminPage() {
  const [allCountries, setAllCountries] = useState([]);
  const [allCities, setAllCities] = useState([]);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await axios.get("https://localhost:7169/api/country");
        setAllCountries(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCountry();
  }, []);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const res = await axios.get("https://localhost:7169/api/city");
        setAllCities(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCity();
  }, []);

  return (
    <div className="adminPage">
      <h2>Admin Page</h2>
      <CreateCountryForm
        allCountrites={allCountries}
        allCities={allCities}
        setAllCountries={setAllCountries}
      />
      <CreateCity />
      <CreateAddress />
      <CreatePlace />
      <CreateStage />
      <CreateCustomer />
      <CreateEvent />
      <CreateEventImage />
      <CreateRating />
      <CreateEventStage />
      <CreateTicket />
    </div>
  );
}

export default AdminPage;
