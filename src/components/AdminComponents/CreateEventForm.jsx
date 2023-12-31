import React from "react";
import Select from "react-select";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/GlobalContext";
import { Link } from "react-router-dom";

function CreateEventForm({ createEvent, deleteEvent }) {
  const { allStages, allEvents, loading } = useContext(AppContext);
  const [name, setName] = useState(
    `Test Event ${Math.random().toFixed(3) * 1000}`
  );
  const [price, setPrice] = useState(100);
  const [date, setDate] = useState(
    new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 16)
      .replace("T", " ")
  );

  const [duration, setDuration] = useState("01:30:00");
  const [description, setDescription] = useState("Event details");
  const [eventType, setEventType] = useState(0);
  const [stageIds, setStageIds] = useState([]);
  const [eventImages, setEventImages] = useState([]);
  const eventTypes = [
    { value: 0, label: "None" },
    { value: 1, label: "Concert" },
    { value: 2, label: "Sport" },
    { value: 3, label: "Art" },
    { value: 4, label: "Cinema" },
    { value: 5, label: "Other" },
  ];
  const [eventImagesInForm, setEventImagesInForm] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    var tempEventImages = eventImages;

    if (eventImages == null || eventImages.length === 0 || eventImages === "") {
      setEventImages(
        "https://acs.digitellinc.com/assets/images/image_placeholder.jpg"
      );
      tempEventImages =
        "https://acs.digitellinc.com/assets/images/image_placeholder.jpg";
      console.log("eventImages", eventImages);
      console.log("tempEventImages", tempEventImages);
    }

    //Picture feature will be added later

    await createEvent({
      name,
      price,
      date,
      duration,
      description,
      eventType,
      eventImages: tempEventImages,
      stageIds,
    });

    setEventImagesInForm([]);
    setEventImages([]);
    setName(`Test Event ${Math.random().toFixed(3) * 1000}`);
    setDate(new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000));
    setDuration("20:45");
    setEventImages([]);
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

  const handleEventDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (confirmDelete === false) return;
    await deleteEvent(id);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Event</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter event name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Enter event price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min={0}
          />
        </div>

        <div>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="datetime-local"
            placeholder="Enter event date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="duration">Duration</label>

          <input
            label="Event Duration"
            id="duration"
            name="duration"
            placeholder="Enter event duration"
            type="time"
            required
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            placeholder="Enter event description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="images">Images</label>
          <input
            label="Event Images"
            id="images"
            name="images"
            type="file"
            placeholder="Enter event images"
            onChange={handleImageChange}
            multiple
          />
        </div>
        <button className="btn btn-primary" onClick={handleImageUpload}>
          Upload
        </button>

        <div className="form-group">
          <label htmlFor="stages">Stages</label>
          <Select
            defaultValue={[]}
            isMulti
            placeholder="Select event stages"
            name="types"
            options={allStages.map((stage) => ({
              value: stage.id,
              label: stage.name,
            }))}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(e) => {
              console.log("e", e);
              const ids = e.map((stage) => stage.value);
              setStageIds(ids);
              console.log("ids", ids);
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
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            <h2>Event List</h2>
            <table>
              <thead>
                <tr>
                  <th>Event Id</th>
                  <th>Event Name</th>
                  <th>Price</th>
                  <th>Date</th>
                  <th>Event Rating</th>
                  <th>Duration</th>
                  <th>Description</th>
                  <th>Event Type</th>
                  <th>Event Images</th>
                  <th>Event Stages</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {allEvents.map((evnt) => (
                  <tr key={evnt.id}>
                    <td>
                      <Link to={`/event/${evnt.id}`}>{evnt.id}</Link>
                    </td>
                    <td>{evnt.name}</td>
                    <td>{evnt.price}</td>
                    <td>{evnt.date}</td>
                    <td>
                      {evnt.avgRating === 0
                        ? "No rating yet"
                        : evnt.avgRating.toFixed(2)}

                      {console.log(evnt)}
                    </td>
                    <td>{evnt.duration}</td>
                    <td>{evnt.description}</td>
                    <td>
                      {
                        eventTypes.find((e) => e.value === evnt.eventType)
                          ?.label
                      }
                    </td>

                    <td>
                      <img
                        src={evnt.eventImages[0]?.urlAddress}
                        alt={evnt.eventImages[0]?.description}
                        width="100"
                        height="100"
                      />
                    </td>
                    <td>
                      {evnt?.eventStages?.map((stage) => (
                        <ul key={stage.id}>
                          <li>
                            •{stage.id} - {stage.name}{" "}
                          </li>
                        </ul>
                      ))}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleEventDelete(evnt.id)}
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
    </div>
  );
}

export default CreateEventForm;
