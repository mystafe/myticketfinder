import React, { useEffect } from "react";
import axios from "axios";

import { useState } from "react";
import CreateCountryForm from "../components/CreateCountryForm";
import CreateCityForm from "../components/CreateCityForm";
import CreateAddressForm from "../components/CreateAddressForm";
import CreatePlaceForm from "../components/CreatePlaceForm";
import CreateStageForm from "../components/CreateStageForm";
import CreateCustomerForm from "../components/CreateCustomerForm";
import CreateEventForm from "../components/CreateEventForm";
import CreateEventImageForm from "../components/CreateEventImageForm";
import CreateRatingForm from "../components/CreateRatingForm";
import CreateEventStageForm from "../components/CreateEventStageForm";
import CreateTicketForm from "../components/CreateTicketForm";
import ListEventSeatsForm from "../components/ListEventSeatsForm";

function AdminPage() {
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

  const fetchCountry = async () => {
    try {
      const res = await axios.get("https://localhost:7169/api/country");
      setAllCountries(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCity = async () => {
    try {
      const res = await axios.get("https://localhost:7169/api/city");
      setAllCities(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAddress = async () => {
    try {
      const res = await axios.get("https://localhost:7169/api/address");
      setAllAddresses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPlace = async () => {
    try {
      const res = await axios.get("https://localhost:7169/api/place");
      setAllPlaces(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStage = async () => {
    try {
      const res = await axios.get("https://localhost:7169/api/stage");
      setAllStages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCustomer = async () => {
    try {
      const res = await axios.get("https://localhost:7169/api/customer");
      setAllCustomers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEvent = async () => {
    try {
      const res = await axios.get("https://localhost:7169/api/event");
      setAllEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEventImage = async () => {
    try {
      const res = await axios.get("https://localhost:7169/api/eventimage");
      setAllEventImages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRating = async () => {
    try {
      const res = await axios.get("https://localhost:7169/api/rating");
      setAllRatings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEventStage = async () => {
    try {
      const res = await axios.get("https://localhost:7169/api/eventstage");
      setAllEventStages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTicket = async () => {
    try {
      const res = await axios.get("https://localhost:7169/api/ticket");
      setAllTickets(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCountry();
    fetchCity();
    fetchAddress();
    fetchPlace();
    fetchStage();
    fetchCustomer();
    fetchEvent();
    fetchEventImage();
    fetchRating();
    fetchEventStage();
    fetchTicket();
  }, []);

  return (
    <div className="adminPage">
      <h2>Admin Page</h2>
      <CreateCountryForm
        allCountries={allCountries}
        fetchCountry={fetchCountry}
      />
      <CreateCityForm
        allCountries={allCountries}
        allCities={allCities}
        fetchCity={fetchCity}
      />
      <CreateAddressForm
        allCountries={allCountries}
        allCities={allCities}
        allAddresses={allAddresses}
        fetchAddress={fetchAddress}
      />
      <CreatePlaceForm
        allCountries={allCountries}
        allCities={allCities}
        allAddresses={allAddresses}
        allPlaces={allPlaces}
        fetchAddress={fetchAddress}
        fetchPlace={fetchPlace}
      />
      <CreateStageForm />
      <CreateCustomerForm />
      <CreateEventForm />
      <CreateEventImageForm />
      <CreateRatingForm />
      <CreateEventStageForm />
      <CreateTicketForm />
      <ListEventSeatsForm />
    </div>
  );
}

export default AdminPage;
