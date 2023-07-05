import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";

function CreatePlaceForm({
  allCountries,
  allCities,
  allAddresses,
  allPlaces,
  fetchAddress,
  fetchPlace,
  loading,
}) {
  const [selectedTable, setSelectedTable] = useState(null);
  const [name, setName] = useState("place name");
  const [openHour, setOpenHour] = useState("10:00");
  const [closeHour, setCloseHour] = useState("22:00");
  const [isActive, setIsActive] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [fullAddress, setFullAddress] = useState("sample full adress");
  const [latitude, setLatitude] = useState(
    `${(Math.random() * 100).toFixed(3)}`
  );
  const [longitude, setLongitude] = useState(
    `${(Math.random() * 100).toFixed(3)}`
  );

  const [showAdditionalFields, setShowAdditionalFields] = useState(true);

  const handleSelectedRow = (id) => {
    setSelectedTable(id);
  };
  const handleUnselectedRow = () => {
    setSelectedTable(null);
  };

  const handleAddress = (id) => {
    if (id === 0 || id == null) {
      setSelectedAddress(null);
      setShowAdditionalFields(true);
      return;
    }

    const address = allAddresses.find((address) => address.id === id);
    setSelectedAddress(address);
    setSelectedCity(address.city?.name);
    setSelectedCountry(
      allCountries.find((country) => country.id === address.city?.countryId)
    );
    setShowAdditionalFields(false);
  };

  const handleCity = (id) => {
    setSelectedCity(allCities.find((city) => city.id === id));
  };

  const handleCountry = (id) => {
    setSelectedCountry(allCountries.find((country) => country.id === id));
  };
  const handleIsActive = (value) => {
    if (value === "on") setIsActive(true);
    else setIsActive(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("second", selectedAddress);
    if (selectedAddress == null) {
      console.log("it is here bro no adress:", selectedAddress);
      console.log(fullAddress, latitude, longitude, selectedCity.id);
      axios
        .post("https://localhost:7169/api/address", {
          fullAddress,
          latitude,
          longitude,
          cityId: selectedCity.id,
        })
        .then((res) => {
          fetchAddress();

          axios
            .post("https://localhost:7169/api/place", {
              name,
              openHour,
              closeHour,
              isActive,
              addressId: res.data.id,
            })
            .then((res) => {
              fetchPlace();
              alert("place created with new address");

              setFullAddress("");
              setLatitude("");
              setLongitude("");
              setSelectedCity(null);
              setSelectedCountry(null);
              setSelectedAddress(null);
              // setName("");
              // setOpenHour("");
              // setCloseHour("");
              setIsActive(true);
            });
        });
    } else {
      console.log("it is here bro with adress:", selectedAddress);
      axios

        .post("https://localhost:7169/api/place", {
          name,
          openHour,
          closeHour,
          isActive,
          addressId: selectedAddress.id,
        })
        .then((res) => {
          alert("place created");
          fetchPlace();

          setLatitude("");
          setLongitude("");

          // setName("");
          // setOpenHour("");
          // setCloseHour("");
          setIsActive(true);
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Crate Place</h2>
        <div>
          <label htmlFor="name">Place Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Place Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="openHour">Open Hour</label>
          <input
            type="time"
            id="openHour"
            placeholder="Enter Open Hour"
            value={openHour}
            onChange={(e) => setOpenHour(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="closeHour">Close Hour</label>
          <input
            type="time"
            id="closeHour"
            placeholder="Enter Close Hour"
            value={closeHour}
            onChange={(e) => setCloseHour(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="isActive">Is Active</label>
          <input
            type="checkbox"
            id="isActive"
            placeholder="Enter Is Active"
            defaultChecked={isActive}
            onChange={(e) => handleIsActive(e.target.checked)}
          />
        </div>
        <div>
          <label htmlFor="addressId">Address</label>

          <Select
            onChange={(e) => {
              handleAddress(e.value);
            }}
            options={[
              { value: 0, label: "Create New Address" },
              ...allAddresses.map((address) => {
                return {
                  value: address?.id,
                  label: address?.fullAddress || "New Address",
                };
              }),
            ]}
          />
        </div>

        {showAdditionalFields && (
          <>
            <div>
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
            <div>
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
            <div>
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
            <div>
              <label htmlFor="country-id">Country</label>
              <Select
                onChange={(e) => {
                  handleCountry(e.value);
                }}
                onSubmit={(e) => handleCountry(e.value)}
                options={allCountries.map((c) => {
                  return { value: c.id, label: c.name };
                })}
              />
            </div>
            <div>
              <label htmlFor="city">City</label>
              <Select
                className="form-control"
                id="city"
                onSubmit={(e) => handleCity(e.value)}
                options={allCities
                  .filter((city) => city.countryId === selectedCountry?.id)
                  .map((city) => ({ value: city.id, label: city.name }))}
              />
            </div>
          </>
        )}
        {!showAdditionalFields && (
          <>
            <div style={{ color: "red" }}>
              <p>{selectedAddress?.fullAddress} </p>

              <p>{selectedCity} </p>

              <p>{selectedCountry?.name} </p>
            </div>
          </>
        )}

        <button type="submit" className="btn btn-primary">
          Create Place
        </button>
      </form>

      <div className="placelist">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <h2>Places</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Place Name</th>
                  <th>Open Hour</th>
                  <th>Close Hour</th>
                  <th>Is Active</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {allPlaces.map((place) => (
                  <tr
                    key={place.id}
                    onMouseEnter={() => handleSelectedRow(place.id)}
                    onMouseLeave={() => handleUnselectedRow()}
                    className={
                      place.id === selectedTable ? "selectedTable" : ""
                    }
                  >
                    <td>{place.name}</td>
                    <td>{place.openHour}</td>
                    <td>{place.closeHour}</td>
                    <td>{place.isActive ? "Active" : "Passive"}</td>
                    <td>
                      {place.address == null
                        ? "No Address"
                        : place.address?.fullAddress || "No Address"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatePlaceForm;
