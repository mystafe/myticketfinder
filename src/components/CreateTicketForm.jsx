import React from "react";
import Select from "react-select";

import { useState } from "react";

function CreateTicketForm({
  createTicket,
  allCustomers,
  allEventSeats,
  allEvents,
}) {
  const [customerId, setCustomerId] = useState(0);
  const [eventSeatId, setEventSeatId] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ticket = {
      dateOfPurchase: new Date().toISOString().slice(0, 19).replace("T", " "),
      customerId,
      eventSeatId,
    };
    await createTicket(ticket);

    setCustomerId(0);
    setEventSeatId(0);
  };

  // const handleDeleteTicket = async (id) => {
  //   const confirmDelete = window.confirm("Are you sure?");
  //   if (confirmDelete === false) return;
  //   await deleteTicket(id);
  // };

  return (
    <div>
      <form className="form-group" onSubmit={(e) => handleSubmit(e)}>
        <h2>Purchase Ticket</h2>
        <div className="form-group">
          <label htmlFor="dateOfPurchase">Customer</label>

          <Select
            defaultValue={[]}
            placeholder="Select customer"
            name="customerId"
            required
            default={0}
            options={allCustomers.map((customer) => ({
              value: customer.id,
              label: customer.fullname,
            }))}
            className="basic-single-select"
            classNamePrefix="select"
            onChange={(e) => {
              setCustomerId(e.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventSeatId">Event Seat</label>
          <Select
            defaultValue={[]}
            placeholder="Select event seat"
            name="eventSeatId"
            required
            default={0}
            options={allEventSeats
              .filter((eventSeat) => eventSeat.isSold === false)
              .map((eventSeat) => ({
                value: eventSeat.id,
                label:
                  "Event Id: " +
                  allEventSeats.find((e) => e.id === eventSeat.id).eventId +
                  " Event Name: " +
                  allEvents.find((e) => e.id === eventSeat.eventId).name +
                  " Event Seat Id: " +
                  eventSeat.id +
                  " Event Seat Name: " +
                  eventSeat.seat.name +
                  " Price: " +
                  eventSeat.eventPrice,
              }))}
            className="basic-single-select"
            classNamePrefix="select"
            onChange={(e) => {
              setEventSeatId(e.value);
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateTicketForm;
