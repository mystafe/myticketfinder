import React, { useState, useEffect } from "react";
import axios from "axios";

import Select from "react-select";
function CreateAddressForm({
  allCountries,
  allCities,
  allAddresses,
  fetchAddress,
}) {
  const [fullAddress, setFullAddress] = useState(
    `Some Address ${(Math.random() * 100).toFixed()}`
  );
  const [latitude, setLatitude] = useState(
    `${(Math.random() * 100).toFixed(3)}`
  );
  const [longitude, setLongitude] = useState(
    `${(Math.random() * 100).toFixed(3)}`
  );

  const [cityId, setCityId] = useState(null);

  const [availableCities, setAvailableCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const handleSelectedRow = (id) => {
    setSelectedTable(id);
  };

  const handleUnselectedRow = () => {
    setSelectedTable(null);
  };

  const handleCity = (id) => {
    console.log("Citye gelen id", id);
    const myCity = allCities.find((city) => city.id == id);
    console.log("myCity", myCity);
    setCityId(id);
    setSelectedCity(myCity);
  };

  const handleCountry = (id) => {
    setSelectedCity(null);
    setSelectedCountry(allCountries.find((country) => country.id == id));
    setAvailableCities(allCities.filter((city) => city.countryId == id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("fullAddress checking now?", fullAddress);

    axios
      .post("https://localhost:7169/api/address", {
        fullAddress,
        latitude,
        longitude,
        cityId,
      })
      .then((res) => {
        fetchAddress();

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
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add Address</h2>

        <div>
          <label>Full Address</label>
          <input
            type="text"
            defaultValue={fullAddress}
            onChange={(e) => setFullAddress(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="GeoLat">Latitude</label>
          <input
            type="text"
            id="GeoLat"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="GeoLong">Longitude</label>
          <input
            type="text"
            id="GeoLong"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </div>

        <div>
          <label>Country</label>
          <Select
            label={"Country"}
            options={allCountries.map((country) => ({
              value: country.id,
              label: country.name,
            }))}
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
            options={allCities
              .filter((city) => city.countryId == selectedCountry?.id)
              .map((city) => ({
                value: city.id,
                label: city.name,
              }))}
          />
        </div>

        <button type="submit" className="btn-primary">
          Create Address
        </button>
      </form>

      <>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
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
                {allAddresses.map((address) => (
                  <tr
                    key={address.id}
                    onClick={() => handleSelectedRow(address.id)}
                    className={selectedTable === address.id ? "selected" : ""}
                  >
                    <td>{address.fullAddress}</td>
                    <td>{address.GeoLocation}</td>
                    <td>{address.city?.name}</td>
                    <td>
                      {
                        allCountries.find(
                          (country) => country.id === address.city.countryId
                        )?.name
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </>
    </div>
  );
}

export default CreateAddressForm;
