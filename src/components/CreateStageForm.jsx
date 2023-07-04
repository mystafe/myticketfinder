import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function CreateStageForm() {
  // "name": "string",
  // "isIndoor": true,
  // "placeId": 0,
  // "capacity": 0,
  // "capacityNormal": 0,
  // "capacityVip": 0

  const [stages, setStages] = useState([]);
  const [name, setName] = useState("");
  const [isIndoor, setIsIndoor] = useState(true);
  const [placeId, setPlaceId] = useState(0);
  const [capacityNormal, setCapacityNormal] = useState(0);
  const [capacityVip, setCapacityVip] = useState(0);
  const [capacity, setCapacity] = useState(capacityNormal + capacityVip);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlace = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://localhost:7169/api/place");
        setPlaces(res.data);
        const res2 = await axios.get("https://localhost:7169/api/stage");
        setStages(res2.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlace();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCapacity(Number(capacityNormal) + Number(capacityVip));
    const stage = {
      name,
      isIndoor,
      placeId,
      capacityNormal,
      capacityVip,
    };
    setLoading(true);

    axios
      .post("https://localhost:7169/api/stage", {
        name,
        isIndoor,
        placeId,
        capacityNormal,
        capacityVip,
      })
      .then((res) => {
        const newStages = [...stages, res.data];
        setStages(newStages);
        setName("");
        setIsIndoor(true);
        setPlaceId(0);
        setCapacityNormal(0);
        setCapacityVip(0);
        setCapacity(0);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleIsIndoor = (value) => {
    if (value == "on") setIsIndoor(true);
    else setIsIndoor(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Create Stage</h2>
        <div className="form-group">
          <label htmlFor="name">Stage Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter stage name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="isIndoor">Is Indoor</label>
          <input
            type="checkbox"
            className="form-control"
            id="isIndoor"
            placeholder="Is Indoor"
            value={isIndoor}
            onChange={(e) => handleIsIndoor(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="placeId">Place</label>
          <select
            className="form-control"
            id="placeId"
            value={placeId}
            onChange={(e) => setPlaceId(e.target.value)}
            required
          >
            <option value="">Select Place</option>
            {places.map((place) => (
              <option key={place.id} value={place.id}>
                {place.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="capacityNormal">Capacity Normal</label>
          <input
            type="number"
            min={0}
            max={100000}
            className="form-control"
            id="capacityNormal"
            placeholder="Enter capacity normal"
            value={capacityNormal}
            onChange={(e) => setCapacityNormal(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="capacityVip">Capacity VIP</label>
          <input
            type="number"
            min={0}
            max={100}
            className="form-control"
            id="capacityVip"
            placeholder="Enter capacity VIP"
            value={capacityVip}
            onChange={(e) => setCapacityVip(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Stage
        </button>
      </form>
      <div className="stageList">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <h2>Stages</h2>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Stage Name</th>
                  <th scope="col">Is Indoor</th>
                  <th scope="col">Place</th>
                  <th scope="col">Capacity</th>
                  <th scope="col">Capacity Normal</th>
                  <th scope="col">Capacity VIP</th>
                </tr>
              </thead>
              <tbody>
                {stages.map((stage) => (
                  <tr key={stage.id}>
                    <td>{stage.name}</td>
                    <td>{stage.isIndoor ? "Yes" : "No"}</td>
                    <td>{stage.place.name}</td>
                    <td>{stage.capacity}</td>
                    <td>{stage.capacityNormal}</td>
                    <td>{stage.capacityVip}</td>
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

export default CreateStageForm;
