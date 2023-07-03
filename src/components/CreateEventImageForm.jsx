import React from "react";
import Select from "react-select";
import { useState, useEffect } from "react";
import axios from "axios";
import { set, useForm } from "react-cool-form";

function CreateEventImageForm() {
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

  const [events, setEvents] = useState([]);
  const [urlAddress, setUrlAddress] = useState("");
  const [description, setDescription] = useState("");
  const [eventId, setEventId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [eventImages, setEventImages] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("https://localhost:7169/api/event");
        setEvents(res.data);
        const res2 = await axios.get("https://localhost:7169/api/eventimage");
        setEventImages(res2.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    // e.preventDefault();

    // "id": 17,
    //     "urlAddress": "https://stcdn.ibb.istanbul/Uploads/2020/9/aycarmela-afis-son-01.jpg?width=600&height=847",
    //     "description": "Default",
    //     "eventId": 1

    try {
      setLoading(true);
      const res = await axios.post("https://localhost:7169/api/eventimage", {
        urlAddress,
        description,
        eventId,
      });
      console.log(res.data);
      setLoading(false);
      alert("Event image created successfully!");
    } catch (error) {
      console.log(error);
    } finally {
      setEventImages([
        ...eventImages,
        {
          urlAddress,
          description,
          eventId,
        },
      ]);

      setUrlAddress("");
      setDescription("");
      setEventId(0);
    }
  };

  const eventOptions = events.map((event) => ({
    value: event.id,
    label: event.name,
  }));

  const deleteEventImage = async (e) => {
    try {
      console.log("e id", e);
      setLoading(true);
      const res = await axios.delete(
        `https://localhost:7169/api/eventimage/${e.target.value}`
      );
      console.log(res.data);
      setLoading(false);
      alert("Event image deleted successfully!");
    } catch (error) {
      console.log(error);
    } finally {
      setEventImages(
        eventImages.filter((eventImage) => eventImage.id !== e.target.value)
      );
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Field
          label="Url Address"
          id="urlAddress"
          name="urlAddress"
          placeholder="Enter url address"
          value={urlAddress}
          onChange={(e) => setUrlAddress(e.target.value)}
          required
          // error={errors.urlAddress}
        />
        <Field
          label="Description"
          required
          id="description"
          name="description"
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Select
          defaultValue={[]}
          placeholder="Select event"
          name="eventId"
          required
          default={0}
          options={eventOptions}
          onChange={(e) => setEventId(e.value)}
        />

        <button type="submit" className="btn btn-primary">
          Create Event Image
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
                  <th>Picture</th>
                  <th>Description</th>
                  <th>Event</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {eventImages.map((eventImage) => (
                  <tr key={eventImage.id}>
                    <td>
                      <img
                        src={eventImage.urlAddress}
                        alt={eventImage.description}
                        width="100"
                        height="100"
                      />
                    </td>
                    <td>{eventImage.description}</td>
                    <td>{eventImage.eventId}</td>
                    <td>
                      {" "}
                      <button
                        className="btn btn-danger"
                        value={eventImage.id}
                        onClick={(e) => deleteEventImage(e)}
                      >
                        Delete
                      </button>
                    </td>
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

export default CreateEventImageForm;
