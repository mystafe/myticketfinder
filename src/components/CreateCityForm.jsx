import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { set, useForm } from "react-cool-form";

function CreateCityForm() {
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

  const [cities, setCities] = useState([]);

  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [countryOptions, setCountryOptions] = useState([]);

  const handleSelectedRow = (id) => {
    setSelectedTable(id);
  };
  const handleUnselectedRow = () => {
    setSelectedTable(null);
  };

  const handleCountry = (id) => {
    setSelectedCountry(countries.filter((c) => c.id == id)[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target["city-name"].value;
    const CountryId = selectedCountry.id;

    axios.post("https://localhost:7169/api/city", {
      name,
      CountryId,
    });
    setCities([...cities, { name, CountryId, id: cities.length + 1 }]);
  };

  useEffect(() => {
    const fetchCity = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://localhost:7169/api/city");
        setCities(res.data);

        const res2 = await axios.get("https://localhost:7169/api/country");
        setCountries(res2.data);
        setCountryOptions(
          res2.data.map((country) => ({
            value: country.id,
            label: country.name,
          }))
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCity();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Create city Form</h2>
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
            options={countryOptions}
          />
        </div>

        <button className="btn-primary" type="submit">
          Create city
        </button>
      </form>

      <div className="citylist">
        {" "}
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {cities && (
              <>
                <h2>Cities</h2>
                <table className="cssTable">
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
                            countries.find((c) => c.id == city.countryId)
                              ?.name ||
                              selectedCountry.name ||
                              "Not Found"

                            // if (countries.find((c) => c.id == city.countryId)) {
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
