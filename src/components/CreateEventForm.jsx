import React from "react";
import Select from "react-select";

import { useState, useEffect } from "react";
import axios from "axios";

import { set, useForm } from "react-cool-form";

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

  const [name, setName] = useState(
    `Test Event ${Math.random().toFixed(3) * 1000}`
  );
  const [price, setPrice] = useState(100);
  const [date, setDate] = useState("2023-07-01T18:45");
  const [duration, setDuration] = useState("01:30:00");
  const [eventType, setEventType] = useState(0);
  const [eventImages, setEventImages] = useState("");
  const [stageIds, setStageIds] = useState([]);
  const [stages, setStages] = useState([]);
  const [eventStages, setEventStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  const [stageOptions, setStageOptions] = useState([]);

  const eventTypes = [
    { value: 0, label: "None" },
    { value: 1, label: "Concert" },
    { value: 2, label: "Sport" },
    { value: 3, label: "Art" },
    { value: 4, label: "Cinema" },
    { value: 5, label: "Other" },
  ];

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

    // if (eventImages == "") {
    //   setEventImages(
    //     "https://acs.digitellinc.com/assets/images/image_placeholder.jpg"
    //   );
    // }
    var tempEventStages;

    //Picture feature will be added later
    if (true) {
      setEventImages(
        "https://acs.digitellinc.com/assets/images/image_placeholder.jpg"
      );
    }

    try {
      const res = await axios.post("https://localhost:7169/api/event", {
        name,
        price,
        date,
        duration,
        eventType,
        eventImages,
        stageIds,
      });

      setEventStages(res.data.eventStages);
      tempEventStages = res.data.eventStages;
    } catch (error) {
      console.log(error);
    } finally {
      setEvents([
        ...events,
        {
          name,
          price,
          date,
          duration,
          eventType,
          eventStages: tempEventStages,
          eventImages: [
            {
              urlAddress:
                "https://acs.digitellinc.com/assets/images/image_placeholder.jpg",
              description: "default",
            },
          ],
        },
      ]);
      setName("Another Test Event");
      setPrice(0);
      setDate("2023-07-01T18:45");
      setDuration("20:45");
      setEventType(0);
      setEventImages("");
      setStageIds([]);
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
    const newImages = [];
    eventImagesInForm.forEach((file) => {
      file.forEach((f) => {
        newImages.push(f.name);
      });
    });

    const newEventImages = newImages.join(",");

    setEventImages(newEventImages);

    setEventImagesInForm([]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Field
          label="Event Name"
          id="name"
          name="name"
          type="text"
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
          type="time"
          required
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <Field
          label="Event Images"
          id="imageUpload"
          name="images"
          type="file"
          placeholder="Enter event images"
          onChange={handleImageChange}
          multiple
        />
        <button className="btn btn-primary" onClick={handleImageUpload}>
          Upload
        </button>

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
              const ids = e.map((stage) => stage.value);
              setStageIds(ids);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventtype">Event Type</label>
          <Select
            defaultValue={[eventTypes[0]]}
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
            <div>
              <h2>Event List</h2>
              <table>
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Event Price</th>
                    <th>Event Date</th>
                    <th>Event Duration</th>
                    <th>Event Type</th>
                    <th>Event Images</th>
                    <th>Event Stages</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.id}>
                      <td>{event.name}</td>
                      <td>{event.price}</td>
                      <td>{event.date}</td>
                      <td>{event.duration}</td>
                      <td>
                        {
                          eventTypes.find((e) => e.value == event.eventType)
                            ?.label
                        }
                      </td>
                      <td>
                        {" "}
                        <img
                          src={event.eventImages[0]?.urlAddress}
                          alt={event.eventImages[0]?.description}
                          width="100"
                          height="100"
                        />
                      </td>
                      <td>
                        <strong>Event Stages</strong>
                        {event?.eventStages?.map((stage) => (
                          <tr key={stage.id}>
                            <td>•{stage.id}</td>
                          </tr>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateEventForm;
