import React, { useState, useEffect } from "react";
import axios from "axios";
import { set, useForm } from "react-cool-form";
import Select from "react-select";
function CreateAddressForm() {
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

  const [addresses, setAddresses] = useState([]);
  const [fullAddress, setFullAddress] = useState(
    `Some Address ${Math.random().toFixed(2) * 100}`
  );
  const [latitude, setLatitude] = useState(
    `${(Math.random() * 100).toFixed(4)}`
  );
  const [longitude, setLongitude] = useState("");
  const [cityId, setCityId] = useState(null);
  const [cities, setCities] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState(null);
  const [countries, setCountries] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityoptions, setCityOptions] = useState([]);

  const handleSelectedRow = (id) => {
    setSelectedTable(id);
  };

  const handleUnselectedRow = () => {
    setSelectedTable(null);
  };

  const handleCity = (id) => {
    setSelectedCity(cities.find((city) => city.id == id));
  };

  const handleCountry = (id) => {
    setSelectedCity(null);
    setSelectedCountry(countries.find((country) => country.id == id));
    setAvailableCities(cities.filter((city) => city.countryId == id));
    setCityOptions(
      cities
        .filter((city) => city.countryId == id)
        .map((city) => ({
          value: city.id,
          label: city.name,
        }))
    );
  };

  useEffect(() => {
    const fetchPlace = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://localhost:7169/api/address");
        setAddresses(res.data);
        const res2 = await axios.get("https://localhost:7169/api/city");
        setCities(res2.data);
        const res3 = await axios.get("https://localhost:7169/api/country");

        setCountries(res3.data);

        setCountryOptions(
          res3.data.map((country) => ({
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
    fetchPlace();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const city = cities.find((city) => city.id == cityId);
    const GeoLocation = `[${latitude},${longitude}]`;

    axios
      .post("https://localhost:7169/api/address", {
        fullAddress,
        latitude,
        longitude,
        cityId,
      })
      .then((res) => {
        setAddresses([
          ...addresses,
          {
            fullAddress,
            GeoLocation,
            city,
            id: addresses.length + 1,
          },
        ]);

        alert("Address Created!");
        setFullAddress("");
        setLatitude("");
        setLongitude("");
        setSelectedCountry(null);
        setSelectedCity(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Add Address</h2>

        <Field
          label="Full Address"
          type="text"
          className="form-control"
          id="FullAddress"
          placeholder="Enter Fulladdress"
          value={fullAddress}
          onChange={(e) => setFullAddress(e.target.value)}
        />

        <Field
          label={"Latitude"}
          type="text"
          className="form-control"
          id="GeoLat"
          placeholder="Enter Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />

        <Field
          label={"Longitude"}
          type="text"
          className="form-control"
          id="GeoLong"
          placeholder="Enter Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />

        <div>
          <label>Country</label>
          <Select
            label={"Country"}
            options={countryOptions}
            placeholder="Select Country"
            onChange={(e) => handleCountry(e.value)}
          />
        </div>
        <div>
          <label htmlFor="cityid">City</label>
          <Select
            label={"City"}
            id="cityid"
            onChange={(e) => handleCity(e.value)}
            options={cityoptions}
          />
        </div>

        <button type="submit" className="btn-primary">
          Create Address
        </button>
      </form>

      <div className="addressList">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <h2>Adresses</h2>
            <table className="cssTable">
              <thead>
                <tr>
                  <th scope="col">Full Address</th>
                  <th scope="col">GeoLocation</th>
                  <th scope="col">City</th>
                  <th scope="col">Country</th>
                </tr>
              </thead>
              <tbody>
                {addresses.map((address) => (
                  <tr
                    key={address.id}
                    onClick={() => handleSelectedRow(address.id)}
                    className={selectedTable === address.id ? "selected" : ""}
                  >
                    <td>{address.fullAddress}</td>
                    <td>{address.GeoLocation}</td>
                    <td>{address.city.name}</td>
                    <td>
                      {
                        countries.find(
                          (country) => country.id === address.city.countryId
                        ).name
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
}

export default CreateAddressForm;
