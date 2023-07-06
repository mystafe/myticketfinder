import React, { useState } from "react";
import Select from "react-select";

import { useContext } from "react";
import { AppContext } from "../../context/GlobalContext";

function CreateCityForm({ createCity, deleteCity }) {
  const { allCities, allCountries, loading } = useContext(AppContext);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleSelectedRow = (id) => {
    setSelectedTable(id);
  };
  const handleUnselectedRow = () => {
    setSelectedTable(null);
  };

  const handleCountry = (id) => {
    setSelectedCountry(allCountries.filter((c) => c.id === id)[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target["city-name"]?.value;
    const CountryId = selectedCountry.id;

    const city = { name, CountryId };
    createCity(city);
  };
  const handleCityDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this city?"
    );

    if (confirmDelete) {
      deleteCity(id);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Create City</h2>
        <div>
          <label htmlFor="city-name">city Name</label>
          <input type="text" id="city-name" />
        </div>
        <div>
          <label htmlFor="country-id">country</label>

          <Select
            onChange={(e) => {
              handleCountry(e.value);
            }}
            options={allCountries.map((c) => {
              return { value: c?.id, label: c?.name };
            })}
          />
        </div>

        <button className="btn-primary" type="submit">
          Create city
        </button>
      </form>

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {allCities && (
            <div>
              <h2>All cities</h2>
              <table className="cssTable">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>CountryId</th>
                    <th>Counrty Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allCities.map((city) => (
                    <tr
                      key={city.id}
                      onMouseEnter={() => handleSelectedRow(city.id)}
                      onMouseLeave={() => handleUnselectedRow()}
                      className={`${
                        selectedTable === city.id ? " selectedTable " : ""
                      }`}
                    >
                      <td>{city?.id}</td>
                      <td>{city?.name}</td>
                      <td>{city?.countryId}</td>
                      <td>
                        {allCountries.find((c) => c.id === city?.countryId)
                          ?.name ||
                          selectedCountry?.name ||
                          "Not Found"}
                      </td>
                      <td>
                        <button
                          className="btn-danger"
                          onClick={() => handleCityDelete(city?.id)}
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
        </>
      )}
    </div>
  );
}

export default CreateCityForm;
