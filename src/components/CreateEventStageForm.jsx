import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { set, useForm } from "react-cool-form";
import Select from "react-select";

function CreateEventStageForm() {
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

  // "id": 14,
  // "name": "AY, CARMELA!2",
  // "basePrice": 200.0,
  // "eventId": 1,
  // "stage":
  const [name, setName] = useState(
    `Test Event Stage ${Math.random().toFixed(3) * 1000}`
  );
  const [basePrice, setBasePrice] = useState(100);
  const [eventId, setEventId] = useState(0);
  const [stageId, setStageId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [stages, setStages] = useState([]);
  const [eventStages, setEventStages] = useState([]);

  const [stageOptions, setStageOptions] = useState([]);

  const [eventOptions, setEventOptions] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://localhost:7169/api/event");
        console.log("events:", res.data);
        setEvents(res.data);
        setEventOptions(
          res.data.map((event) => {
            return { value: event.id, label: event.name };
          })
        );
        const res2 = await axios.get("https://localhost:7169/api/stage");
        setStages(res2.data);
        setStageOptions(
          res2.data.map((stage) => {
            return { value: stage.id, label: stage.name };
          })
        );
        const res3 = await axios.get("https://localhost:7169/api/eventstage");
        setEventStages(res3.data);
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

    // "id": 14,
    // "name": "AY, CARMELA!2",
    // "basePrice": 200.0,
    // "eventId": 1,

    try {
      console.log("handlesubmit", basePrice);
      setLoading(true);
      const res = await axios.post("https://localhost:7169/api/eventstage", {
        name,
        basePrice,
        eventId,
        stageId,
      });
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Field
          label="Event Name"
          id="eventname"
          name="eventname"
          placeholder="Enter event name "
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Field
          label="Base Price"
          id="basePrice"
          name="basePrice"
          type="number"
          placeholder="Enter base price"
          value={basePrice}
          onChange={(e) => {
            console.log("inside", e.target.value);
            setBasePrice(e.target.value);
          }}
          required
        />

        <Select
          id="eventId"
          name="eventId"
          // {...set({ required: "Event is required!" })}
          options={eventOptions}
          onChange={(e) => setEventId(e.value)}
          placeholder="Select event"
        />

        <Select
          id="stageId"
          name="stageId"
          onChange={(e) => setStageId(e.value)}
          // {...set({ required: "Stage is required!" })}
          options={stageOptions}
          placeholder="Select stage"
        />

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>

      <div className="eventStagelist">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Stage Name</th>
                  <th>Base Price</th>
                </tr>
              </thead>
              <tbody>
                {eventStages.map((eventStage) => (
                  <tr key={eventStage.id}>
                    {/* <td>{events[eventStage.eventId - 1]?.name}</td> */}
                    <td>
                      {" "}
                      {events.map((event) =>
                        event.id === eventStage.eventId ? event.name : null
                      )}
                    </td>
                    <td>{stages.map((stage) => stage.name)}</td>
                    <td>{eventStage.basePrice}</td>
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
export default CreateEventStageForm;
