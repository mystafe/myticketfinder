import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Section from "../components/Section";
import { Link } from "react-router-dom";

import axios from "axios";

function MainEvents() {
  const [popularEvents, setPopularEvents] = useState(null);
  const [concertEvents, setConcertEvents] = useState(null);
  const [footballEvents, setFootballEvents] = useState(null);
  const [thisWeekEvents, setThisWeekEvents] = useState(null);
  const [thisMonthEvents, setThisMonthEvents] = useState(null);
  const [pastWeekEvents, setPastWeekEvents] = useState(null);
  const [eventsNearMe, setEventsNearMe] = useState(null);

  const [randomEvents, setRandomEvents] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("https://localhost:7169/api/event/");

        const popularevents = res.data
          .filter((event) => event.avgRating > 3)
          .slice(0, 3);
        const concertEvents = res.data.filter((event) => event.eventType === 1);

        const footballEvents = res.data.filter(
          (event) => event.eventType === 2
        );
        const thisWeekEvents = res.data
          .filter(
            (event) =>
              new Date(event.date) <=
                new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000) &&
              new Date(event.date) >= new Date(new Date().getTime())
          )
          .slice(0, 3);

        const thisMonthEvents = res.data
          .filter(
            (event) =>
              new Date(event.date) <=
                new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000) &&
              new Date(event.date) >= new Date(new Date().getTime())
          )
          .slice(0, 3);
        const pastWeekEvents = res.data
          .filter(
            (event) =>
              new Date(event.date) >=
                new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000) &&
              new Date(event.date) < new Date(new Date().getTime())
          )
          .slice(0, 3);

        const eventsNearMe = res.data.filter(
          (event) => event.eventLocation === "Istanbul"
        );

        const randomEvents = getRandomElements(res.data).slice(0, 3);

        setEventsNearMe(eventsNearMe);
        setPastWeekEvents(pastWeekEvents);
        setThisMonthEvents(thisMonthEvents);
        setPopularEvents(popularevents);
        setFootballEvents(footballEvents);
        setConcertEvents(concertEvents);
        setThisWeekEvents(thisWeekEvents);
        setRandomEvents(randomEvents);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvents();
  }, []);

  const getRandomElements = (array) => {
    const result = [];
    const shuffled = array.slice(); // Diziyi kopyalama

    let currentIndex = shuffled.length;
    let temporaryValue, randomIndex;

    while (currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = shuffled[currentIndex];
      shuffled[currentIndex] = shuffled[randomIndex];
      shuffled[randomIndex] = temporaryValue;
    }

    result.push(...shuffled.slice(0, 3));

    return result;
  };
  return (
    <div
      style={{ backgroundColor: "rgb(247, 247, 247)", paddingBottom: "4rem" }}
    >
      {/* <PopularEvents /> */}

      <Section data={footballEvents} name="Football Events" />
      <Section data={concertEvents} name="Concert Events" />
      <Section data={thisWeekEvents} name="This Week Events" />
      <Section data={thisMonthEvents} name="This Month Events" />
      <Section data={pastWeekEvents} name="Past Week Events" />
      <Section data={eventsNearMe} name="Events Near Me" />
      <Section data={popularEvents} name="Popular Events" />
      <Section data={randomEvents} name="Featured Events" />

      <div className="u-center-text u-margin-top-huge">
        <Link to="event" className="btn btn--green">
          Discover all
        </Link>
      </div>
    </div>
  );
}

export default MainEvents;
