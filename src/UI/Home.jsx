import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

import PopularEvents from "./MainPageEvents/PopularEvents";
import FootballEvents from "./MainPageEvents/FootballEvents";
import MainEvents from "./MainEvents";

function Home() {
  return (
    <>
      <header className="header main">
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

      <MainEvents />
    </>
  );
}

export default Home;
