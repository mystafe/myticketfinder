import React, { useState } from "react";
import axios from "axios";

function CreateCityForm() {
  const [cities, setCities] = useState([]);
  const [countryId, setCountryId] = useState(null);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedTable, setSelectedTable] = useState(null);

  const handleSelectedRow = (id) => {
    setSelectedTable(id);
  };
  const handleUnselectedRow = () => {
    setSelectedTable(null);
  };

  const handleCountryId = (id) => {
    setCountryId(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cityName = e.target["city-name"].value;

    console.log(cityName);

    console.log("target", e.target);

    axios.post("https://localhost:7169/api/city", {
      name: cityName,
      countryId,
    });
    setCities([
      ...cities,
      { name: cityName, countryId, id: cities.length + 1 },
    ]);
  };

  useState(() => {
    const fetchCity = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://localhost:7169/api/city");
        setCities(res.data);
        const res2 = await axios.get("https://localhost:7169/api/country");
        setCountries(res2.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCity();
  }, [cities]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Create city Form</h1>
        <label htmlFor="city-name">city Name</label>
        <input type="text" id="city-name" />
        <label htmlFor="country-id">country</label>
        <select
          value={countryId}
          onChange={(e) => {
            e.preventDefault();
            handleCountryId(e.target.value);
          }}
        >
          <option>SelectCountry</option>

          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
        <button type="submit">Create city</button>
      </form>

      <div className="citylist">
        {" "}
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {cities && (
              <>
                <h1>Here is cities</h1>
                <table className="citytable">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>CountryId</th>
                      <th>Counrty Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cities.map((city) => (
                      <tr
                        key={city.id}
                        onMouseEnter={() => handleSelectedRow(city.id)}
                        onMouseLeave={() => handleUnselectedRow()}
                        className={`${
                          selectedTable === city.id ? " selectedTable " : ""
                        }`}
                      >
                        <td>{city.id}</td>
                        <td>{city.name}</td>
                        <td>{city.countryId}</td>
                        <td>
                          {
                            countries.filter((c) => c.id == city.countryId)[0]
                              .name
                          }
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

export default CreateCityForm;
