import React, { useContext, useEffect } from "react";
import axios from "axios";
import "../UI/AdminPage.css";

import { AppContext } from "../context/GlobalContext";
import CreateCountryForm from "../components/AdminComponents/CreateCountryForm";
import CreateCityForm from "../components/AdminComponents/CreateCityForm";

import CreateAddressForm from "../components/AdminComponents/CreateAddressForm";
import CreatePlaceForm from "../components/AdminComponents/CreatePlaceForm";
import CreateStageForm from "../components/AdminComponents/CreateStageForm";
import CreateCustomerForm from "../components/AdminComponents/CreateCustomerForm";

import CreateEventImageForm from "../components/AdminComponents/CreateEventImageForm";
import CreateRatingForm from "../components/AdminComponents/CreateRatingForm";
import CreateEventStageForm from "../components/AdminComponents/CreateEventStageForm";
import CreateTicketForm from "../components/AdminComponents/CreateTicketForm";
import CreateEventForm from "../components/AdminComponents/CreateEventForm";

import ListEventSeatsForm from "../components/AdminComponents/ListEventSeatsForm";
import ListSeatsForm from "../components/AdminComponents/ListSeatsForm";

function AdminPage() {
  const {
    isSearchClicked,
    isAdmin,
    setLoading,
    setAllCountries,
    setAllCities,
    setAllAddresses,
    setAllPlaces,
    setAllStages,
    setAllCustomers,
    setAllEvents,
    setAllEventImages,
    setAllRatings,
    setAllEventStages,
    setAllTickets,
    setAllEventSeats,
    setAllSeats,
    fetchEvent,
  } = useContext(AppContext);
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
  const createCity = async (city) => {
    try {
      setLoading(true);
      await axios.post("https://localhost:7169/api/city", city);
      fetchCity();
    } catch (error) {
      console.log(error);
      alert("City could not created!");
    } finally {
      setLoading(false);
    }
  };

  const deleteCity = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://localhost:7169/api/city/${id}`);
      fetchCity();
    } catch (error) {
      console.log(error);
      alert("City could not deleted!");
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
      fetchAddress();
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
      fetchSeats();
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
      fetchSeats();
      fetchEventStage();
      fetchEventSeats();
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
      fetchAddress();
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
    } catch (error) {
      console.log(error);
      alert("Customer could not deleted!");
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (event) => {
    try {
      setLoading(true);
      await axios.post("https://localhost:7169/api/event", event);
      fetchEvent();
      fetchEventImage();
      fetchEventStage();
      fetchEventSeats();
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
      axios.delete(`https://localhost:7169/api/event/${id}`);
      fetchEvent();
      fetchEventImage();
      fetchEventStage();
      fetchEventSeats();

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
      fetchEvent();
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
      fetchEvent();
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
      fetchEvent();
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
      fetchEventSeats();
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
      fetchEventSeats();
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
      fetchEventStage();
      fetchEventSeats();
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
      fetchEventStage();
      fetchEventSeats();
      alert("Ticket Deleted!");
    } catch (error) {
      console.log(error);
      alert("Ticket could not deleted!");
    } finally {
      setLoading(false);
    }
  };

  const fetchEventSeats = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://localhost:7169/api/eventseat");
      setAllEventSeats(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteEventSeat = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://localhost:7169/api/eventseat/${id}`);
      fetchEventSeats();
      fetchEventStage();
      fetchEvent();
      fetchTicket();
      fetchRating();
      alert("Event Seat Deleted!");
    } catch (error) {
      console.log(error);
      alert("Event Seat could not deleted!");
    } finally {
      setLoading(false);
    }
  };

  const createEventSeat = async (eventSeat) => {
    try {
      setLoading(true);
      await axios.post("https://localhost:7169/api/eventseat", eventSeat);
      fetchEventSeats();
      fetchEventStage();
    } catch (error) {
      console.log(error);
      alert("Event Seat could not created!");
    } finally {
      setLoading(false);
    }
  };

  const fetchSeats = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://localhost:7169/api/seat");
      setAllSeats(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const createSeat = async (seat) => {
    try {
      setLoading(true);
      await axios.post("https://localhost:7169/api/seat", seat);
      fetchSeats();
      fetchStage();
    } catch (error) {
      console.log(error);
      alert("Seat could not created!");
    } finally {
      setLoading(false);
    }
  };

  const deleteSeat = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://localhost:7169/api/seat/${id}`);
      fetchSeats();
      fetchStage();
      fetchEventStage();
      fetchEventSeats();

      alert("Seat Deleted!");
    } catch (error) {
      console.log(error);
      alert("Seat could not deleted!");
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
    fetchEventImage();
    fetchEvent();
    fetchRating();
    fetchEventStage();
    fetchTicket();
    fetchEventSeats();
    fetchSeats();
  }, []);

  return (
    isAdmin && (
      <div className="adminPage">
        <h1>Admin Page</h1>
        <CreateCountryForm
          createCountry={createCountry}
          deleteCountry={deleteCountry}
        />
        <CreateCityForm createCity={createCity} deleteCity={deleteCity} />
        <CreateAddressForm
          createAddress={createAddress}
          deleteAddress={deleteAddress}
        />
        <CreatePlaceForm
          createAddress={createAddress}
          createPlace={createPlace}
          deletePlace={deletePlace}
        />
        <CreateStageForm
          fetchPlace={fetchPlace}
          createStage={createStage}
          deleteStage={deleteStage}
        />
        <CreateCustomerForm
          createCustomer={createCustomer}
          deleteCustomer={deleteCustomer}
        />

        <CreateEventForm
          deleteEvent={deleteEvent}
          createEvent={createEvent}
          createEventImage={createEventImage}
          createEventStage={createEventStage}
        />
        <CreateEventImageForm
          createEventImage={createEventImage}
          deleteEventImage={deleteEventImage}
        />
        <CreateRatingForm
          createRating={createRating}
          deleteRating={deleteRating}
        />
        <CreateEventStageForm
          createEventStage={createEventStage}
          deleteEventStage={deleteEventStage}
        />
        <CreateTicketForm
          createTicket={createTicket}
          deleteTicket={deleteTicket}
        />
        <ListEventSeatsForm deleteEventSeat={deleteEventSeat} />
        <ListSeatsForm deleteSeat={deleteSeat} />
      </div>
    )
  );
}

export default AdminPage;
