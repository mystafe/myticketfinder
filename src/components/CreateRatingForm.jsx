import React from "react";
import Select from "react-select";
import { useState, useEffect } from "react";
import axios from "axios";
import { set, useForm } from "react-cool-form";

function CreateRatingForm() {
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

  const [ratingValue, setRatingValue] = useState(0);
  const [comment, setComment] = useState("");
  const [eventId, setEventId] = useState(0);
  const [customerId, setCustomerId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [ratingOptions, setRatingOptions] = useState([
    { value: 0, label: "Disaster" },
    { value: 1, label: "Very Bad" },
    { value: 2, label: "Bad" },
    { value: 3, label: "Normal" },
    { value: 4, label: "Good" },
    { value: 5, label: "Very Good" },
  ]);

  //   "ratingValue": 5,
  //   "comment": "This is amazing",
  //   "eventId": {{EventId}},
  //   "customerId": {{CustomerId}}
  // }

  useEffect(() => {
    const fetchEventsAndCustomers = async () => {
      try {
        const res = await axios.get("https://localhost:7169/api/event");
        setEvents(res.data);
        const res2 = await axios.get("https://localhost:7169/api/customer");
        setCustomers(res2.data);

        setLoading(false);

        console.log("events", res.data);
        console.log("customers", res2.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEventsAndCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // "ratingValue": 5,
    // "comment": "This is amazing",
    // "eventId": {{EventId}},
    // "customerId": {{CustomerId}}

    try {
      console.log("ratingValue", ratingValue);
      console.log("comment", comment);
      console.log("eventId", eventId);
      console.log("customerId", customerId);

      setLoading(true);
      const res = await axios.post("https://localhost:7169/api/rating", {
        ratingValue,
        comment,
        eventId,
        customerId,
      });
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);

      setRatings([
        ...ratings,
        {
          ratingValue,
          comment,
          eventId,
          customerId,
        },
      ]);

      setRatingValue(0);
      setComment("");
      setEventId(0);
      setCustomerId(0);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Select
          options={ratingOptions}
          onChange={(e) => setRatingValue(e.value)}
          placeholder="Select Rating"
          required
        />

        <Select
          options={events.map((event) => ({
            value: event.id,
            label: event.name,
          }))}
          onChange={(e) => setEventId(e.value)}
          placeholder="Select Event"
          required
        />

        <Select
          options={customers.map((customer) => ({
            value: customer.id,
            label: customer.fullname,
          }))}
          onChange={(e) => setCustomerId(e.value)}
          placeholder="Select Customer"
          required
        />
        <div className="form-group">
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

      <div className="eventImageList">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Event</th>
                  <th>Rating</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                {ratings.map((rating) => (
                  <tr key={rating.id}>
                    <td>
                      {customers.map((customer) =>
                        customer.id === rating.customerId
                          ? customer.fullname
                          : ""
                      )}
                    </td>
                    <td>
                      {" "}
                      {events.map((event) =>
                        event.id === rating.eventId ? event.name : ""
                      )}
                    </td>

                    <td>{rating.ratingValue}</td>
                    <td>{rating.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default CreateRatingForm;
