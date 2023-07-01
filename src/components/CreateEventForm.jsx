import React from "react";
import Select from "react-select";

import { useState, useEffect } from "react";
import axios from "axios";

import { useForm } from "react-cool-form";
import { clear } from "@testing-library/user-event/dist/clear";

function CreateEventForm() {
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

  const [name, setName] = useState("Test Event");
  const [price, setPrice] = useState(10);
  const [date, setDate] = useState("2023-07-01T18:45");
  const [duration, setDuration] = useState("30");
  const [eventType, setEventType] = useState(1);
  const [eventImages, setEventImages] = useState("");
  const [stageIds, setStageIds] = useState([]);
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  const [stageOptions, setStageOptions] = useState([
    { value: 1, label: "Stage 1" },
    { value: 2, label: "Stage 2" },
  ]);

  const eventTypes = [
    { value: 0, label: "None" },
    { value: 1, label: "Concert" },
    { value: 2, label: "Sport" },
    { value: 3, label: "Art" },
    { value: 4, label: "Cinema" },
    { value: 5, label: "Other" },
  ];

  const [eventTypeId, setEventTypeId] = useState(0);
  const [event, setEvent] = useState([]);
  const [eventImagesInForm, setEventImagesInForm] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://localhost:7169/api/event");
        setEvents(res.data);
        const res2 = await axios.get("https://localhost:7169/api/stage");
        setStages(res2.data);
        setStageOptions(
          res2.data.map((stage) => ({ value: stage.id, label: stage.name }))
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.table({
      name,
      price,
      date,
      duration,
      eventType,
      eventImages,
      stageIds,
      eventTypeId,
      eventImagesInForm,
    });
    try {
      const res = await axios.post("thttps://localhost:7169/api/event", {
        name,
        price,
        date,
        duration,
        eventType,
        eventImages,
        stageIds,
      });
      setEvent(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      setEventImagesInForm([...eventImagesInForm, files]);
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const newImages = eventImagesInForm.map((file) => file);
    console.log("eventImagesInForm", ...eventImagesInForm);
    console.log("newImages", newImages);
    setEventImages(newImages);
    setEventImagesInForm([]);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Field
          label="Event Name"
          id="name"
          name="name"
          placeholder="Enter event name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          error={errors.name}
        />
        <Field
          label="Event Price"
          id="price"
          name="price"
          type="number"
          placeholder="Enter event price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          error={errors.price}
          min={0}
        />
        <Field
          label="Event Date"
          id="date"
          name="date"
          type="datetime-local"
          placeholder="Enter event date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Field
          label="Event Duration"
          id="duration"
          name="duration"
          placeholder="Enter event duration"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        {/* <Field
          label="Event Images"
          isMulti
          id="eventImages"
          name="eventImages"
          type="file"
          placeholder="Enter event images"
          onChange={handleImageChange}
        />
        <button className="btn btn-primary" onClick={handleImageUpload}>
          Upload
        </button> */}

        {/* //upload multiple images */}
        <Field
          label="Event Images"
          id="images"
          name="images"
          type="file"
          placeholder="Enter event images"
          onChange={handleImageChange}
          multiple
        />
        <button className="btn btn-primary" onClick={handleImageUpload}>
          Upload
        </button>

        {/* <div className="form-group">
          <label htmlFor="eventImages">Event Images</label>
          <input
            type="file"
            className="form-control"
            id="eventImages"
            placeholder="Enter event images"
            onChange={handleImageChange}
          />
          <button className="btn btn-primary" onClick={handleImageUpload}>
            Upload
          </button>
        </div> */}

        <div className="form-group">
          <label htmlFor="stages">Stages</label>
          <Select
            defaultValue={[]}
            isMulti
            placeholder="Select event types"
            name="types"
            options={stageOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(e) => {
              console.log(e);
              const ids = e.map((stage) => stage.value);
              setStageIds(ids);
              console.log("ids", ids);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventtype">Event Type</label>
          <Select
            defaultValue={[]}
            placeholder="Select event type"
            name="eventtype"
            options={eventTypes}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(e) => setEventType(e.value)}
          />
        </div>
        <input className="btn button  btn-primary" type="submit" />
      </form>
      <div>
        <div className="eventList">
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Event Price</th>
                    <th>Event Date</th>
                    <th>Event Duration</th>
                    <th>Event Type</th>
                    <th>Event Images</th>
                    <th>Stage Ids</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.id}>
                      <td>{event.name}</td>
                      <td>{event.price}</td>
                      <td>{event.date}</td>
                      <td>{event.duration}</td>
                      <td>{event.eventType}</td>
                      <td> event images </td>
                      <td>event stage Ids </td>
                      {/* <td>{event.eventImages}</td>
                      <td>{event.stageIds}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CreateEventForm;
