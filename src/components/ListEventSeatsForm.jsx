import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function ListEventSeatsForm() {
  // {"id": 193,
  // "eventPrice": 300,
  // "isSold": false,
  // "eventId": 1,
  // "eventStageId": 14,
  // "seat": {
  //   "id": 1,
  //   "name": "Vip 1",
  //   "type": 1,
  //   "stage": null
  // }}

  const [eventSeats, setEventSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventStages, setEventStages] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEventSeats = async () => {
      try {
        const res = await axios.get("https://localhost:7169/api/eventseat");
        setEventSeats(res.data);
        const res2 = await axios.get("https://localhost:7169/api/eventstage");
        setEventStages(res2.data);

        const res3 = await axios.get("https://localhost:7169/api/event");
        setEvents(res3.data);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEventSeats();
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2>Event Seats</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Event Seat Id</th>
                <th scope="col">Event Price</th>
                <th scope="col">Is Sold</th>
                <th scope="col">Event Id</th>
                <th scope="col">Event Name</th>
                <th scope="col">Event Stage Id</th>
                <th scope="col">Seat Id</th>
                <th scope="col">Seat Name</th>
                <th scope="col">Seat Type</th>
                <th scope="col">Stage Id</th>
                <th scope="col">Stage Name</th>
              </tr>
            </thead>
            <tbody>
              {eventSeats.map((eventSeat) => (
                <tr key={eventSeat.id}>
                  <td>{eventSeat.id}</td>
                  <td>{eventSeat.eventPrice}</td>
                  <td>{`${eventSeat.isSold ? "Sold" : "Available"}`}</td>
                  <td>{eventSeat.eventId}</td>
                  <td>{events.find((e) => e.id == eventSeat.eventId).name}</td>
                  <td>{eventSeat.eventStageId}</td>
                  <td>{eventSeat.seat?.id}</td>
                  <td>{eventSeat.seat.name}</td>
                  <td>
                    {" "}
                    {`${eventSeat.seat?.type === 1 ? "vip" : "normal"}`}{" "}
                  </td>
                  <td>
                    {
                      eventStages.find((es) => es.id == eventSeat.eventStageId)
                        .stage.id
                    }
                  </td>
                  <td>
                    {
                      eventStages.find((es) => es.id == eventSeat.eventStageId)
                        .stage.name
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default ListEventSeatsForm;
