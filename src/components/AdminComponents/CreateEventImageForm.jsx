import React from "react";
import Select from "react-select";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/GlobalContext";

function CreateEventImageForm({ createEventImage, deleteEventImage }) {
  const { allEvents, allEventImages, loading } = useContext(AppContext);
  const [urlAddress, setUrlAddress] = useState("");
  const [description, setDescription] = useState("");
  const [eventId, setEventId] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("images", { urlAddress, description, eventId });

    await createEventImage({ urlAddress, description, eventId });
    setUrlAddress("");
    setDescription("");
    setEventId(0);
  };

  const handleDeleteEventImage = async (e) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (confirmDelete === false) return;
    await deleteEventImage(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Create Event Image</h2>
        <div className="form-group">
          <label htmlFor="name">Url Address</label>
          <input
            type="url"
            id="urlAddress"
            name="urlAddress"
            placeholder="Enter url address"
            value={urlAddress}
            onChange={(e) => {
              e.preventDefault();

              setUrlAddress(e.target.value);
            }}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            required
            id="description"
            name="description"
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="event">Event</label>

          <Select
            defaultValue={[]}
            placeholder="Select event"
            name="eventId"
            required
            default={0}
            options={allEvents.map((event) => ({
              value: event.id,
              label: event.name,
            }))}
            onChange={(e) => {
              setEventId(e.value);
              console.log(e.value);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Event Image
        </button>
      </form>

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h2>Event Images</h2>
          <table>
            <thead>
              <tr>
                <th> Id</th>
                <th>Picture</th>
                <th>Description</th>
                <th>Event</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allEventImages.map((eventImage) => (
                <tr key={eventImage.id}>
                  <td>{eventImage.id}</td>
                  <td>
                    <img
                      src={eventImage.urlAddress}
                      alt={eventImage.description}
                      width="100"
                      height="100"
                    />
                  </td>
                  <td>{eventImage.description}</td>
                  <td>
                    {eventImage.eventId} -{" "}
                    {
                      allEvents.filter((e) => e.id === eventImage.eventId)[0]
                        ?.name
                    }{" "}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      value={eventImage.id}
                      onClick={(e) => handleDeleteEventImage(e)}
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

export default CreateEventImageForm;
