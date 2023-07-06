import React from "react";
import Select from "react-select";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/GlobalContext";

function CreateRatingForm({ createRating, deleteRating }) {
  const { allCustomers, allEvents, allRatings, loading } =
    useContext(AppContext);
  const [ratingValue, setRatingValue] = useState(0);
  const [comment, setComment] = useState("some comment");
  const [eventId, setEventId] = useState(0);
  const [customerId, setCustomerId] = useState(0);
  const ratingOptions = [
    { value: 0, label: "None" },
    { value: 1, label: "Very Bad" },
    { value: 2, label: "Bad" },
    { value: 3, label: "Normal" },
    { value: 4, label: "Good" },
    { value: 5, label: "Very Good" },
  ];

  const handleDeleteRating = async (e) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (confirmDelete === false) return;
    await deleteRating(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createRating({ ratingValue, comment, eventId, customerId });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Create Rating</h2>

        <div>
          <label htmlFor="customer">Customer</label>
          <Select
            options={allCustomers.map((customer) => ({
              value: customer.id,
              label: customer.fullname,
            }))}
            onChange={(e) => setCustomerId(e.value)}
            placeholder="Select Customer"
            required
          />
        </div>
        <div>
          <label htmlFor="event">Event</label>
          <Select
            options={allEvents.map((event) => ({
              value: event.id,
              label: event.name,
            }))}
            onChange={(e) => setEventId(e.value)}
            placeholder="Select Event"
            required
          />
        </div>

        <div>
          <label htmlFor="ratingValue">Rating Value</label>

          <Select
            options={ratingOptions}
            onChange={(e) => setRatingValue(e.value)}
            placeholder="Select Rating"
            required
          />
        </div>

        <div className="">
          <label htmlFor="comment">Comment</label>
          <textarea
            className="form-control"
            id="comment"
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
        </div>

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h2>Ratings</h2>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Customer</th>
                <th>Event</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allRatings.map((rating) => (
                <tr key={rating.id}>
                  <td>{rating.id}</td>
                  <td>
                    {allCustomers
                      .filter((customer) => customer.id === rating.customer.id)
                      .map((customer) => customer.fullname)}
                  </td>
                  <td>
                    {allEvents
                      .filter((event) => event.id === rating.event.id)
                      .map((event) => event.name)}
                  </td>

                  <td>{rating.ratingValue}</td>
                  <td>{rating.comment}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      value={rating.id}
                      onClick={handleDeleteRating}
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

export default CreateRatingForm;
