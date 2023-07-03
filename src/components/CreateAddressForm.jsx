import React, { useState, useEffect } from "react";
import axios from "axios";

function CreateAddressForm() {
  const [addresses, setAddresses] = useState([]);
  const [fullAddress, setFullAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [cityId, setCityId] = useState(null);
  const [cities, setCities] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState(null);
  const [countries, setCountries] = useState([]);
  const [countryId, setCountryId] = useState(null);

  const handleSelectedRow = (id) => {
    setSelectedTable(id);
  };

  const handleUnselectedRow = () => {
    setSelectedTable(null);
  };

  const handleCityId = (id) => {
    setCityId(id);
  };

  const handleCountryId = (id) => {
    setCountryId(id);
    setAvailableCities(cities.filter((city) => city.countryId == id));
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
        setCityId(null);
        setCountryId(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="FullAddress">Full Address</label>
          <input
            type="text"
            className="form-control"
            id="FullAddress"
            placeholder="Enter Fulladdress"
            value={fullAddress}
            onChange={(e) => setFullAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="GeoLat">Latitude</label>
          <input
            type="text"
            className="form-control"
            id="GeoLat"
            placeholder="Enter Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="GeoLong">Longitude</label>
          <input
            type="text"
            className="form-control"
            id="GeoLong"
            placeholder="Enter Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="country-id">Country</label>
          <select
            className="form-control"
            id="country-id"
            onChange={(e) => handleCountryId(e.target.value)}
            value={countryId}
          >
            <option value={null}>Select country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="city-id">City</label>
          <select
            className="form-control"
            id="city-id"
            onChange={(e) => handleCityId(e.target.value)}
            value={cityId}
          >
            <option value={null}>Select city</option>
            {availableCities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>

      <div className="addressList">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <h1>Here are addresses</h1>
            <table className="table">
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
