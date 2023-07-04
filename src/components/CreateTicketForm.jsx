import React from "react";
import Select from "react-select";

import { useState, useEffect } from "react";
import axios from "axios";

import { set, useForm } from "react-cool-form";

function CreateTicketForm() {
  // "dateOfPurchase": "2023-07-03T09:07:20.696Z",
  // "customerId": 0,
  // "eventSeatId": 0

  const Field = ({ label, id, error, ...rest }) => (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...rest} />
      {error && <p>{error}</p>}
    </div>
  );

  const { form, use } = useForm({
    defaultValues: { username: "", email: "", password: "" },
    onSubmit: (values) => console.log("onSubmit: ", values),
  });

  const errors = use("errors", { errorWithTouched: true }); // Default is "false"

  const [dateOfPurchase, setDateOfPurchase] = useState(
    new Date().toISOString().slice(0, 19).replace("T", " ")
  );
  const [customers, setCustomers] = useState([]);
  const [eventSeats, setEventSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customerId, setCustomerId] = useState(0);
  const [eventSeatId, setEventSeatId] = useState(0);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchCustomersAndEventSeats = async () => {
      try {
        const res = await axios.get("https://localhost:7169/api/customer");
        setCustomers(res.data);
        const res2 = await axios.get("https://localhost:7169/api/eventseat");
        setEventSeats(res2.data);
        const res3 = await axios.get("https://localhost:7169/api/event");
        setEvents(res3.data);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCustomersAndEventSeats();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setDateOfPurchase(
        new Date().toISOString().slice(0, 19).replace("T", " ")
      );

      const res = await axios.post("https://localhost:7169/api/ticket", {
        dateOfPurchase: dateOfPurchase,
        customerId: customerId,
        eventSeatId: eventSeatId,
      });

      alert("Ticket purchased successfully!");
      setDateOfPurchase(
        new Date().toISOString().slice(0, 19).replace("T", " ")
      );
      setCustomerId(0);
      setEventSeatId(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className="form-group" onSubmit={(e) => handleSubmit(e)}>
        <h2>Customer</h2>
        <div className="form-group">
          <label htmlFor="dateOfPurchase">Customer</label>

          <Select
            defaultValue={[]}
            placeholder="Select customer"
            name="customerId"
            required
            default={0}
            options={customers.map((customer) => ({
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
            error={errors.eventSeatId}
            default={0}
            options={eventSeats
              .filter((eventSeat) => eventSeat.isSold === false)
              .map((eventSeat) => ({
                value: eventSeat.id,
                label:
                  events.find((e) => e.id == eventSeat?.eventId)?.name +
                  " " +
                  eventSeat.id +
                  " " +
                  eventSeat.seat.name +
                  " " +
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
