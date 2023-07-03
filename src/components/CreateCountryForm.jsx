import React, { useState } from "react";
import axios from "axios";

function CreateCountryForm() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = React.useState(true);
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
    console.log(countryName);
    axios.post("https://localhost:7169/api/country", {
      name: countryName,
    });
    setCountries([
      ...countries,
      { name: countryName, id: countries.length + 1 },
    ]);
  };

  useState(() => {
    const fetchCountry = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://localhost:7169/api/country");
        setCountries(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountry();
  }, [countries]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Create Country Form</h1>
        <label htmlFor="country-name">Country Name</label>
        <input type="text" id="country-name" />

        <button type="submit">Create Country</button>
      </form>

      <div className="countrylist">
        {" "}
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {countries && (
              <>
                <h1>Here is countries</h1>
                <table className="countrytable">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {countries.map((country) => (
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
