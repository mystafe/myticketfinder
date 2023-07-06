import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { isLogged } = useContext(AppContext);

  const menuLinks = [
    {
      name: "All Events",
      link: "/event/all",
    },
    {
      name: " Popular Events",
      link: "/event/popularevents",
    },
    {
      name: "Upcoming Events",
      link: "/event/upcomingevents",
    },
    {
      name: "Past Events",
      link: "/event/pastevents",
    },
    {
      name: "Free Events",
      link: "/event/freeevents",
    },
    {
      name: "Today's Events",
      link: "/event/todaysevents",
    },
    {
      name: "This Week's Events",
      link: "/event/thisweeksevents",
    },
    {
      name: "Free Events",
      link: "/event/freeevents",
    },
    {
      name: "Concert Events",
      link: "/event/concertevents",
    },
    {
      name: "Sports Events",
      link: "/event/sportsevents",
    },
    {
      name: "Comedy Events",
      link: "/event/comedyevents",
    },
    {
      name: "Movies",
      link: "/event/movies",
    },
    {
      name: "Art",
      link: "/event/art",
    },
  ];

  return (
    <div className={`navbar ${isLogged ? "display" : "hide"}`}>
      <ul>
        {menuLinks.map((link) => (
          <li>
            <Link to={link.link}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;
