import React from "react";
import EventList from "../components/EventList";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

function Events() {
  return (
    <div className="events">
      <Header />
      <Navbar />
      <EventList />
    </div>
  );
}

export default Events;
