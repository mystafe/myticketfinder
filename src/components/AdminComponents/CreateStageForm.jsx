import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/GlobalContext";
import Select from "react-select";

function CreateStageForm({ createStage, deleteStage }) {
  const { allPlaces, allStages, loading } = useContext(AppContext);
  const [name, setName] = useState(
    `Test Stage ${Math.floor(Math.random() * 100).toFixed()}`
  );
  const [isIndoor, setIsIndoor] = useState(true);
  const [placeId, setPlaceId] = useState(0);
  const [capacityNormal, setCapacityNormal] = useState(0);
  const [capacityVip, setCapacityVip] = useState(0);

  const handleDeletion = (id) => {
    const confirm = window.confirm("Are you sure?");
    if (confirm === false) return;

    deleteStage(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const stage = {
      name,
      isIndoor,
      placeId,
      capacityNormal,
      capacityVip,
    };

    createStage(stage);

    setName("");
    setIsIndoor(true);
    setPlaceId(0);
    setCapacityNormal(0);
    setCapacityVip(0);
  };

  const handleIsIndoor = (value) => {
    if (value === "on") setIsIndoor(true);
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
          <Select
            className="form-control"
            placeholder="Select place"
            id="placeId"
            onChange={(e) => setPlaceId(e.value)}
            required
            options={allPlaces.map((place) => ({
              value: place.id,
              label: place.name,
            }))}
          />
        </div>

        <div className="form-group">
          <label htmlFor="capacityNormal">Capacity Normal</label>
          <input
            type="number"
            min={0}
            max={100000}
            className="form-control"
            id="capacityNormal"
            placeholder="Enter normal seat capacity"
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
            placeholder="Enter VIP seat capacity  "
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
          <h1>Loading...</h1>
        ) : (
          <div>
            <h2>Stages</h2>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col"> Id</th>
                  <th scope="col">Stage Name</th>
                  <th scope="col">Is Indoor</th>
                  <th scope="col">Place</th>
                  <th scope="col">Capacity</th>
                  <th scope="col">Capacity Normal</th>
                  <th scope="col">Capacity VIP</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allStages.map((stage) => (
                  <tr key={stage.id}>
                    <td>{stage.id}</td>
                    <td>{stage.name}</td>
                    <td>{stage.isIndoor ? "Yes" : "No"}</td>
                    <td>{stage.place.name}</td>
                    <td>{stage.capacity}</td>
                    <td>{stage.capacityNormal}</td>
                    <td>{stage.capacityVip}</td>
                    <td>
                      {" "}
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleDeletion(stage.id);
                        }}
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

export default CreateStageForm;
