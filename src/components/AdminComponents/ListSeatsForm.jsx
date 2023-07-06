import React from "react";

import { useContext } from "react";
import { AppContext } from "../../context/GlobalContext";

function ListSeatsForm({ deleteSeat }) {
  const { allSeats, loading } = useContext(AppContext);

  const handleDeleteSeat = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this seat?"
    );
    if (confirmDelete === false) return;
    deleteSeat(id);
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2> Seats</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Seat Id</th>
                <th scope="col">Seat Name</th>
                <th scope="col">Seat Type</th>
                <th scope="col">Stage Id</th>
                <th scope="col">Stage Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allSeats.map((seat) => (
                <tr key={seat.id}>
                  <td>{seat.id}</td>
                  <td>{seat.name}</td>
                  <td>{`${seat.type === 1 ? "vip" : "normal"}`}</td>

                  <td>{seat.stage?.id}</td>
                  <td>{seat.stage?.name}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteSeat(seat.id)}
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
    </div>
  );
}

export default ListSeatsForm;
