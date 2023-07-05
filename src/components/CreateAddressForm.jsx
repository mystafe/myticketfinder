import React, { useState } from "react";

import Select from "react-select";
function CreateAddressForm({
  allCountries,
  allCities,
  allAddresses,
  fetchAddress,
  createAddress,
  deleteAddress,
  loading,
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
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const handleSelectedRow = (id) => {
    setSelectedTable(id);
  };
  const handleUnselectedRow = () => {
    setSelectedTable(null);
  };
  const handleCity = (id) => {
    console.log("Citye gelen id", id);
    const myCity = allCities.find((city) => city.id === id);
    console.log("myCity", myCity);
    setCityId(id);
  };
  const handleCountry = (id) => {
    setSelectedCountry(allCountries.find((country) => country.id === id));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("fullAddress checking now?", fullAddress);

    const address = {
      fullAddress,
      latitude,
      longitude,
      cityId,
    };
    const res = await createAddress(address);
    alert("Address Created!");
    console.log("res", res);
    fetchAddress();
    setFullAddress("");
    setLatitude("");
    setLongitude("");
    setSelectedCountry(null);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (confirmDelete === false) return;
    await deleteAddress(id);
    alert("Address Deleted!");
    fetchAddress();
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
              .filter((city) => city.countryId === selectedCountry?.id)
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

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {allAddresses && (
            <div>
              <h2>Addresses</h2>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Full Address</th>
                    <th scope="col">GeoLocation</th>
                    <th scope="col">City</th>
                    <th scope="col">Country</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allAddresses.map((address) => (
                    <tr
                      key={address.id}
                      onMouseEnter={() => handleSelectedRow(address.id)}
                      onMouseLeave={handleUnselectedRow}
                      className={selectedTable === address.id ? "selected" : ""}
                    >
                      <td>{address.fullAddress}</td>
                      <td>
                        {" "}
                        Lat: {address.geoLocation.slice(1).split(",")[0]} -
                        Long: {address.geoLocation.split(",")[1].slice(0, -1)}
                      </td>
                      <td>{address.city?.name}</td>
                      <td>
                        {
                          allCountries.find(
                            (country) => country.id === address.city.countryId
                          )?.name
                        }
                      </td>
                      <td>
                        <button
                          className="btn-danger"
                          onClick={() => handleDelete(address.id)}
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

export default CreateAddressForm;
