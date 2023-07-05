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
import { set } from "react-cool-form";

function AdminPage() {
  const [loading, setLoading] = React.useState(true);
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
    setLoading(true);
    try {
      const res = await axios.get("https://localhost:7169/api/country");
      setAllCountries(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const createCountry = async (country) => {
    try {
      setLoading(true);
      await axios.post("https://localhost:7169/api/country", country);
      fetchCountry();
      alert("Country Created!");
    } catch (error) {
      console.log(error);
      alert("Country could not created!");
    } finally {
      setLoading(false);
    }
  };

  const deleteCountry = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://localhost:7169/api/country/${id}`);
      fetchCountry();
      alert("Country Deleted!");
    } catch (error) {
      console.log(error);
      alert("Country could not deleted!");
    } finally {
      setLoading(false);
    }
  };

  const fetchCity = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://localhost:7169/api/city");
      setAllCities(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAddress = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://localhost:7169/api/address");
      setAllAddresses(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const createAddress = async (address) => {
    try {
      setLoading(true);
      await axios.post("https://localhost:7169/api/address", address);
      fetchAddress();
      alert("Address Created!");
    } catch (error) {
      console.log(error);
      alert("Address could not created!");
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://localhost:7169/api/address/${id}`);
      fetchAddress();
      alert("Address Deleted!");
    } catch (error) {
      console.log(error);
      alert("Address could not deleted!");
    } finally {
      setLoading(false);
    }
  };

  const fetchPlace = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://localhost:7169/api/place");
      setAllPlaces(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const createPlace = async (place) => {
    try {
      setLoading(true);
      await axios.post("https://localhost:7169/api/place", place);
      fetchPlace();
      alert("Place Created!");
    } catch (error) {
      console.log(error);
      alert("Place could not created!");
    } finally {
      setLoading(false);
    }
  };

  const deletePlace = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://localhost:7169/api/place/${id}`);
      fetchPlace();
      alert("Place Deleted!");
    } catch (error) {
      console.log(error);
      alert("Place could not deleted!");
    } finally {
      setLoading(false);
    }
  };

  const fetchStage = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://localhost:7169/api/stage");
      setAllStages(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const createStage = async (stage) => {
    try {
      setLoading(true);
      await axios.post("https://localhost:7169/api/stage", stage);
      fetchStage();
      alert("Stage Created!");
    } catch (error) {
      console.log(error);
      alert("Stage could not created!");
    } finally {
      setLoading(false);
    }
  };
  const deleteStage = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://localhost:7169/api/stage/${id}`);
      fetchStage();
      alert("Stage Deleted!");
    } catch (error) {
      console.log(error);
      alert("Stage could not deleted!");
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomer = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://localhost:7169/api/customer");
      setAllCustomers(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const createCustomer = async (customer) => {
    try {
      setLoading(true);
      await axios.post("https://localhost:7169/api/customer", customer);
      fetchCustomer();
      alert("Customer Created!");
    } catch (error) {
      console.log(error);
      alert("Customer could not created!");
    } finally {
      setLoading(false);
    }
  };
  const deleteCustomer = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://localhost:7169/api/customer/${id}`);
      fetchCustomer();
      alert("Customer Deleted!");
    } catch (error) {
      console.log(error);
      alert("Customer could not deleted!");
    } finally {
      setLoading(false);
    }
  };

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://localhost:7169/api/event");
      setAllEvents(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (event) => {
    try {
      setLoading(true);
      await axios.post("https://localhost:7169/api/event", event);
      fetchEvent();
      alert("Event Created!");
    } catch (error) {
      console.log(error);
      alert("Event could not created!");
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://localhost:7169/api/event/${id}`);
      fetchEvent();
      alert("Event Deleted!");
    } catch (error) {
      console.log(error);
      alert("Event could not deleted!");
    } finally {
      setLoading(false);
    }
  };
  const fetchEventImage = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://localhost:7169/api/eventimage");
      setAllEventImages(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const createEventImage = async (eventImage) => {
    try {
      setLoading(true);
      await axios.post("https://localhost:7169/api/eventimage", eventImage);
      fetchEventImage();
      alert("Event Image Created!");
    } catch (error) {
      console.log(error);
      alert("Event Image could not created!");
    } finally {
      setLoading(false);
    }
  };
  const deleteEventImage = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://localhost:7169/api/eventimage/${id}`);
      fetchEventImage();
      alert("Event Image Deleted!");
    } catch (error) {
      console.log(error);
      alert("Event Image could not deleted!");
    } finally {
      setLoading(false);
    }
  };

  const fetchRating = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://localhost:7169/api/rating");
      setAllRatings(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const createRating = async (rating) => {
    try {
      setLoading(true);
      await axios.post("https://localhost:7169/api/rating", rating);
      fetchRating();
      alert("Rating Created!");
    } catch (error) {
      console.log(error);
      alert("Rating could not created!");
    } finally {
      setLoading(false);
    }
  };

  const deleteRating = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://localhost:7169/api/rating/${id}`);
      fetchRating();
      alert("Rating Deleted!");
    } catch (error) {
      console.log(error);
      alert("Rating could not deleted!");
    } finally {
      setLoading(false);
    }
  };

  const fetchEventStage = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://localhost:7169/api/eventstage");
      setAllEventStages(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const createEventStage = async (eventStage) => {
    try {
      setLoading(true);
      await axios.post("https://localhost:7169/api/eventstage", eventStage);
      fetchEventStage();
      alert("Event Stage Created!");
    } catch (error) {
      console.log(error);
      alert("Event Stage could not created!");
    } finally {
      setLoading(false);
    }
  };
  const deleteEventStage = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://localhost:7169/api/eventstage/${id}`);
      fetchEventStage();
      alert("Event Stage Deleted!");
    } catch (error) {
      console.log(error);
      alert("Event Stage could not deleted!");
    } finally {
      setLoading(false);
    }
  };

  const fetchTicket = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://localhost:7169/api/ticket");
      setAllTickets(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const createTicket = async (ticket) => {
    try {
      setLoading(true);
      await axios.post("https://localhost:7169/api/ticket", ticket);
      fetchTicket();
      alert("Ticket Created!");
    } catch (error) {
      console.log(error);
      alert("Ticket could not created!");
    } finally {
      setLoading(false);
    }
  };
  const deleteTicket = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://localhost:7169/api/ticket/${id}`);
      fetchTicket();
      alert("Ticket Deleted!");
    } catch (error) {
      console.log(error);
      alert("Ticket could not deleted!");
    } finally {
      setLoading(false);
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
        loading={loading}
      />
      <CreateCityForm
        allCountries={allCountries}
        allCities={allCities}
        fetchCity={fetchCity}
        loading={loading}
      />
      <CreateAddressForm
        allCountries={allCountries}
        allCities={allCities}
        allAddresses={allAddresses}
        fetchAddress={fetchAddress}
        createAddress={createAddress}
        deleteAddress={deleteAddress}
        loading={loading}
      />
      <CreatePlaceForm
        allCountries={allCountries}
        allCities={allCities}
        allAddresses={allAddresses}
        allPlaces={allPlaces}
        fetchAddress={fetchAddress}
        fetchPlace={fetchPlace}
        loading={loading}
      />
      <CreateStageForm
        allPlaces={allPlaces}
        fetchPlace={fetchPlace}
        allStages={allStages}
        fetchStage={fetchStage}
        createStage={createStage}
        deleteStage={deleteStage}
        loading={loading}
      />
      <CreateCustomerForm
        allCustomers={allCustomers}
        allAddresses={allAddresses}
        allCities={allCities}
        allCountries={allCountries}
        createCustomer={createCustomer}
        deleteCustomer={deleteCustomer}
        createAddress={createAddress}
        fetchAddress={fetchAddress}
        loading={loading}
      />
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
