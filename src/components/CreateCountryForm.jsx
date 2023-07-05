import React, { useState } from "react";
import axios from "axios";

function CreateCountryForm({ allCountries, fetchCountry, loading }) {
  const [selectedTable, setSelectedTable] = useState(null);

  const handleSelectedRow = (id) => {
    setSelectedTable(id);
  };
  const handleUnselectedRow = () => {
    setSelectedTable(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const countryName = e.target["country-name"].value;

    try {
      axios
        .post("https://localhost:7169/api/country", {
          name: countryName,
        })
        .then((res) => {
          fetchCountry();
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="formHeader">Create Country</h2>
        <div>
          <label htmlFor="country-name">Country Name</label>
          <input type="text" id="country-name" />
        </div>

        <button className="btn-primary" type="submit">
          Create Country
        </button>
      </form>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {allCountries && (
            <div>
              <h2>Countries</h2>
              <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {allCountries.map((country) => (
                    <tr
                      key={country.id}
                      onMouseEnter={() => handleSelectedRow(country.id)}
                      onMouseLeave={() => handleUnselectedRow()}
                      className={`${
                        selectedTable === country.id ? "selectedTable" : ""
                      }`}
                    >
                      <td>{country.id}</td>

                      <td>
                        <a
                          style={{ color: "black" }}
                          href={`/country/${country.id}`}
                        >
                          {country.name}
                        </a>
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

export default CreateCountryForm;
