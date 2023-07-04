import React, { useState } from "react";
import axios, { all } from "axios";
import { set } from "react-cool-form";

function CreateCountryForm({ allCountrites, setAllCountries }) {
  console.log("Here are all countries", allCountrites);

  const [loading, setLoading] = React.useState(false);
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
    var countryId = null;

    try {
      const res = axios.post("https://localhost:7169/api/country", {
        name: countryName,
      });
      res.then((res) => {
        countryId = res.data.id;
      });
    } catch (error) {
      console.log(error);
    }

    setAllCountries([
      ...allCountrites,
      { name: countryName, id: allCountrites[allCountrites.length - 1].id + 1 },
    ]);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2 className="formHeader">Create Country Form</h2>
        <div>
          <label htmlFor="country-name">Country Name</label>
          <input type="text" id="country-name" />
        </div>

        <button className="btn-primary" type="submit">
          Create Country
        </button>
      </form>
      <div className="countrylist">
        {" "}
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {allCountrites && (
              <>
                <h2>Here are countries</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allCountrites.map((country) => (
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
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default CreateCountryForm;
