import React, { useContext, useState } from "react";
import { AppContext } from "../../context/GlobalContext";

function CreateCountryForm({ createCountry, deleteCountry }) {
  const { allCountries, loading } = useContext(AppContext);

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
    const country = { name: countryName };
    createCountry(country);
  };
  const handleDeleteCountry = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this country?"
    );
    if (confirmDelete) {
      deleteCountry(id);
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
                    <th>Action</th>
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
                      <td>
                        <button
                          className="btn-danger"
                          onClick={() => {
                            handleDeleteCountry(country.id);
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
        </>
      )}
    </div>
  );
}

export default CreateCountryForm;
