import React from "react";
import { useContext } from "react";
import { AppContext } from "../../context/GlobalContext";

function ListEventSeatsForm({ deleteEventSeat }) {
  const { allEventSeats, allEventStages, allEvents, loading } =
    useContext(AppContext);
  const handleDeleteEventSeat = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event seat?"
    );
    if (confirmDelete === false) return;
    deleteEventSeat(id);
  };

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
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allEventSeats.map((eventSeat) => (
                <tr key={eventSeat.id}>
                  <td>{eventSeat.id}</td>
                  <td>{eventSeat.eventPrice}</td>
                  <td>{`${eventSeat.isSold ? "Sold" : "Available"}`}</td>
                  <td>{eventSeat.eventId}</td>
                  <td>
                    {allEvents.find((e) => e.id === eventSeat.eventId)?.name}
                  </td>
                  <td>{eventSeat.eventStageId}</td>
                  <td>{eventSeat.seat?.id}</td>
                  <td>{eventSeat.seat?.name}</td>
                  <td>
                    {" "}
                    {`${eventSeat.seat?.type === 1 ? "vip" : "normal"}`}{" "}
                  </td>
                  <td>
                    {
                      allEventStages.find(
                        (es) => es.id === eventSeat.eventStageId
                      )?.stage.id
                    }
                  </td>
                  <td>
                    {
                      allEventStages.find(
                        (es) => es.id === eventSeat.eventStageId
                      )?.stage?.name
                    }
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteEventSeat(eventSeat.id)}
                    >
                      Delete
                    </button>
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
