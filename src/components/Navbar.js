import React from "react";

function Navbar() {
  return (
    <div className="navbar">
      <ul>
        <li>
          <a href="/event">All Events</a>
        </li>
        <li>
          <a href="/event/1">Popular Events</a>
        </li>
        <li>
          <a href="/country/create">Upcoming Events </a>
        </li>
        <li>
          <a href="#past">Past Events</a>
        </li>
        <li>
          <a href="#free">Free Events</a>
        </li>
        <li>
          <a href="#today">Today's Events</a>
        </li>
        <li>
          <a href="#thisweek">This Week's Events</a>
        </li>
        <li>
          <a href="#family">Free Events</a>
        </li>

        <li>
          <a href="#concert">Concert Events</a>
        </li>
        <li>
          <a href="#sports">Sports Events</a>
        </li>
        <li>
          <a href="#comedy">Comedy Events</a>
        </li>
        <li>
          <a href="#festivals">Festivals</a>
        </li>
        <li>
          <a href="#movies">Movies</a>
        </li>
        <li>
          <a href="#nightlife">Nightlife</a>
        </li>
        <li>
          <a href="#art">Art</a>
        </li>
        <li>
          <a href="#food">Food</a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
