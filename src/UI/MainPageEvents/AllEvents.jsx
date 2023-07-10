import React from "react";
import Section from "../../components/Section";
import axios from "axios";
import { useState, useEffect } from "react";

function AllEvents() {
  const [allEvents, setAllEvents] = useState(null);
  const name = "All Events";
  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get("https://localhost:7169/api/event/");
      setAllEvents(res.data);
    };
    fetchEvents();
  }, []);

  return <Section data={allEvents} name={name} />;
}

export default AllEvents;
