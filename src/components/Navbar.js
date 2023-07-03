import React from "react";

function Navbar() {
  return (
    <div className="navbar">
      <ul>
        <li>
          <a href="/event">event - All Events</a>
        </li>
        <li>
          <a href="/event/1">event 1 - Popular Events</a>
        </li>
        <li>
          <a href="/country/create">country - Upcoming Events </a>
        </li>
        <li>
          <a href="/city/create">city - Past Events</a>
        </li>
        <li>
          <a href="/address/create">address - Free Events</a>
        </li>
        <li>
          <a href="/place/create">place - Today's Events</a>
        </li>
        <li>
          <a href="/customer/create">customer - This Week's Events</a>
        </li>
        <li>
          <a href="/stage/create">Stage - Free Events</a>
        </li>

        <li>
          <a href="/event/create">Event - Concert Events</a>
        </li>
        <li>
          <a href="/ticket/create">Ticket - Sports Events</a>
        </li>
        <li>
          <a href="/eventseat/list">Eventseat - Comedy Events</a>
        </li>
        <li>
          <a href="/eventimage/create">EventImage - Movies</a>
        </li>
        <li>
          <a href="/rating/create">Rating - Nightlife</a>
        </li>
        <li>
          <a href="/eventstage/create">EventStage - Art</a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
