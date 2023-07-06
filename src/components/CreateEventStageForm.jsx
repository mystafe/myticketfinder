import React from "react";
import { useState } from "react";

import Select from "react-select";

function CreateEventStageForm({
  createEventStage,
  deleteEventStage,
  allEvents,
  allStages,
  allEventStages,
  loading,
}) {
  const [name, setName] = useState(
    `Test Event Stage ${Math.random().toFixed(3) * 1000}`
  );
  const [basePrice, setBasePrice] = useState(100);
  const [eventId, setEventId] = useState(0);
  const [stageId, setStageId] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createEventStage({ name, basePrice, eventId, stageId });
  };

  const handleDeleteEventStage = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (confirmDelete === false) return;
    await deleteEventStage(id);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Create Event Stage</h2>
        <div>
          <label htmlFor="eventname">Event</label>
          <input
            id="eventname"
            name="eventname"
            placeholder="Enter event name "
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            type="text"
          />
        </div>
        <div>
          <label htmlFor="basePrice">Price</label>
          <input
            id="basePrice"
            name="basePrice"
            type="number"
            placeholder="Enter base price"
            value={basePrice}
            onChange={(e) => {
              setBasePrice(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="eventId">Event</label>
          <Select
            id="eventId"
            name="eventId"
            options={allEvents.map((event) => ({
              value: event.id,
              label: event.name,
            }))}
            onChange={(e) => setEventId(e.value)}
            placeholder="Select event"
          />
        </div>
        <div>
          <label htmlFor="stageId">Stage</label>

          <Select
            id="stageId"
            name="stageId"
            onChange={(e) => setStageId(e.value)}
            options={allStages.map((stage) => ({
              value: stage.id,
              label: stage.name,
            }))}
            placeholder="Select stage"
          />
        </div>
        <button className="btn-primary" type="submit">
          Create Event Stage
        </button>
      </form>

      <div>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            <h2>Event Stages</h2>
            <table>
              <thead>
                <tr>
                  <th>Event Stage Id</th>
                  <th>Event Name</th>
                  <th>Stage Name</th>
                  <th>Base Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allEventStages.map((eventStage) => (
                  <tr key={eventStage.id}>
                    <td>{eventStage.id}</td>
                    <td>
                      {allEvents.map((event) =>
                        event.id === eventStage.eventId ? event.name : null
                      )}
                    </td>
                    <td>{allStages.map((stage) => stage.name)}</td>
                    <td>{eventStage.basePrice}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteEventStage(eventStage.id)}
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
export default CreateEventStageForm;
