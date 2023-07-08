import React from "react";
import { Link } from "react-router-dom";
import "./Jonas.css";

import PopularEvents from "./PopularEvents";
import FootballEvents from "./FootballEvents";
import EventDetail from "../components/EventDetail";

function Jonas() {
  return (
    <>
      <header className="header">
        <div className="text__box">
          <h1 className="heading-primary">
            <span className="heading-primary--main">My Ticker Finder </span>
            <span className="heading-primary--sub">
              <p> Find all events around you</p>
              <p>and get your ticket within seconds..</p>
            </span>
          </h1>

          <Link
            to="/admin"
            id="btnDiscover"
            className="btn btn--discover btn--white btn--animated "
          >
            Discover our events
          </Link>
        </div>
      </header>

      {/* <Section /> */}
      <PopularEvents />
      <FootballEvents />
      <EventDetail />
    </>
  );
}

export default Jonas;
