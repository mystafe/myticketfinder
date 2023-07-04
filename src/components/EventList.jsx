// ref: https://www.izmir.art/tr/4-monoprint-gunleri-sergisi?seans=64708e704747b0a9b5a6c45c

import React, { useState, useEffect } from "react";
import EventDetails from "./EventDetails";
import axios from "axios";

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState(null);

  const handleSelectedRow = (id) => {
    setSelectedTable(id);
  };
  const handleUnselectedRow = () => {
    setSelectedTable(null);
  };

  const handleEventType = (type) => {
    if (type === 1) return "Concert";
    else if (type === 2) return "Sport";
    else if (type === 3) return "Theater";
    else if (type === 4) return "Festival";
    else return "Undefined";
  };
  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://localhost:7169/api/event");
        setEvents(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, []);

  // eslint-disable-next-line no-lone-blocks
  {
    return (
      <>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {events && (
              <div>
                <h2>Here are events</h2>
                <table className="eventtable">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Date</th>
                      <th>AvgRating</th>
                      <th>Duration</th>
                      <th>Image</th>
                      <th>IsActive</th>
                      <th>IsAvailable</th>
                      <th>IsOnSale</th>
                      <th>EventType</th>
                      <th>Price</th>
                      <th>Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event) => (
                      <tr
                        key={event.id}
                        onClick={() => handleSelectedRow(event.id)}
                        onMouseLeave={() => handleUnselectedRow()}
                        className={`${
                          selectedTable === event.id ? "selectedTable" : ""
                        }`}
                      >
                        <td>{event.id}</td>

                        <td>
                          <a href={`/event/${event.id}`}>{event.name}</a>
                        </td>

                        <td>{event.description}</td>
                        <td>{event.date}</td>
                        <td>{event.avgRating}</td>
                        <td>{event.duration}</td>

                        {/* will be implemented later */}
                        {[
                          console.log(
                            event.eventStages[0] == null
                              ? event.name + " No event"
                              : event.name + " " + event.eventStages[0].eventId
                          ),
                        ]}

                        <td>
                          {" "}
                          <img
                            style={{ width: 200 }}
                            src={
                              event.eventImages[0] == null
                                ? "No no"
                                : event.eventImages[0].urlAddress
                            }
                            alt="eventImage"
                          />
                        </td>
                        <td>{event.isActive ? "Active" : "Passive"}</td>
                        <td>
                          {event.isAvailable ? "Available" : "Not Available"}
                        </td>
                        <td>{event.isOnSale ? "On Sale" : "Not On Sale"}</td>
                        <td>{handleEventType(event.eventType)}</td>
                        <td>{event.price}</td>
                        <td>{event.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </>
    );
  }
}

export default EventList;
