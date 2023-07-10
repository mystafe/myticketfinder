import React from "react";
import Section from "../../components/Section";
import axios from "axios";
import { useState, useEffect } from "react";

function AllEvents() {
  const [allEvents, setAllEvents] = useState([]);
  const name = "All Events";
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("https://localhost:7169/api/event/");
        setAllEvents(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvents();
  }, []);

  return allEvents && <Section data={allEvents} name={name} />;
}

export default AllEvents;
