import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function CreatePlaceForm() {
  const [places, setPlaces] = useState([]);
  const [addressId, setAddressId] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState(null);
  const [countries, setCountries] = useState([]);
  const [countryId, setCountryId] = useState(1);
  const [cityId, setCityId] = useState(1);
  const [name, setName] = useState("place name");
  const [openHour, setOpenHour] = useState("10:00");
  const [closeHour, setCloseHour] = useState("22:00");
  const [isActive, setIsActive] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedCountryId, setSelectedCountryId] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [fullAddress, setFullAddress] = useState("sample full adress");
  const [latitude, setLatitude] = useState("41.3");
  const [longitude, setLongitude] = useState("42.3");
  const [cities, setCities] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);
  const [cityName, setCityName] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [countryName, setCountryName] = useState("");

  const [showAdditionalFields, setShowAdditionalFields] = useState(true);

  const handleSelectedRow = (id) => {
    setSelectedTable(id);
  };
  const handleUnselectedRow = () => {
    setSelectedTable(null);
  };

  const handleAddressId = (id) => {

    if (id == 0 || id == null) {
      setAddressId(null);
      setShowAdditionalFields(true);

      return;
    }
    setAddressId(id);
    const selectedAddress = addresses.find((address) => address.id == id);

    setSelectedAddress(selectedAddress);
    setSelectedCity(selectedAddress.city.name);
    setSelectedCountryId(selectedAddress.city.countryId);
    setSelectedCountry(
      countries.find((country) => country.id == selectedAddress.city.countryId)
    );
    setShowAdditionalFields(false);
  };

  const handleCountryId = (id) => {
    setCountryId(id);
    setSelectedCountry(countries.find((country) => country.id == id));
    setAvailableCities(cities.filter((city) => city.countryId == id));
  };

  const handleCityId = (id) => {
    setCityId(id);
    setSelectedCity(cities.find((city) => city.id == id));
  };
  const handleIsActive = (value) => {
    if (value == "on") setIsActive(true);
    else setIsActive(false);
  };

  useEffect(() => {
    const fetchPlace = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://localhost:7169/api/place");
        setPlaces(res.data);

        const res2 = await axios.get("https://localhost:7169/api/address");
        setAddresses(res2.data);
        const res3 = await axios.get("https://localhost:7169/api/country");
        setCountries(res3.data);
        const res4 = await axios.get("https://localhost:7169/api/city");
        setCities(res4.data);
        setAvailableCities(
          res4.data.filter((city) => city.countryId == selectedCountryId)
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

    console.clear();

    const address = addresses.find((address) => address.id == addressId);

    // console.log("address", address);

    if (address == undefined) {
     

      axios
        .post("https://localhost:7169/api/address", {
          fullAddress,
          latitude,
          longitude,
          cityId,
        })
        .then((res) => {
          setAddressId(res.data.id);

          axios
            .post("https://localhost:7169/api/place", {
              name,
              openHour,
              closeHour,
              isActive,
              addressId: res.data.id,
            })
            .then((res) => {
              setPlaces([
                ...places,
                {
                  name,
                  openHour: openHour + ":00",
                  closeHour: closeHour + ":00",
                  isActive,
                  addressId: res.data.id,
                  address: {
                    fullAddress,
                    latitude,
                    longitude,
                    cityId,
                  },
                  id: places.length + 1,
                },
              ]);

              setFullAddress("");
              setLatitude("");
              setLongitude("");
              setCityId(null);
              setCountryId(null);
              setName("");
              setOpenHour("");
              setCloseHour("");
              setIsActive(true);
              setAddressId(null);
            });
        });
    } else {
   

      axios

        .post("https://localhost:7169/api/place", {
          name,
          openHour,
          closeHour,
          isActive,
          addressId,
        })
        .then((res) => {
          alert("place created");
          setPlaces([
            ...places,
            {
              name,
              openHour: openHour + ":00",
              closeHour: closeHour + ":00",
              isActive,
              addressId,
              address,
              id: places.length + 1,
            },
          ]);

          setFullAddress("");
          setLatitude("");
          setLongitude("");
          setCityId(null);
          setCountryId(null);
          setName("");
          setOpenHour("");
          setCloseHour("");
          setIsActive(true);
          setAddressId(null);
        });
    }
  };

  return (
    <>
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
          <select
            id="addressId"
            value={addressId}
            onChange={(e) => handleAddressId(e.target.value)}
          >
            <option value={0}>Select Address</option>
            {addresses.map((address) => (
              <option key={address.id} value={address.id}>
                {address.fullAddress}
              </option>
            ))}
          </select>
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
            <div>
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
          </>
        )}
        {!showAdditionalFields && (
          <>
            <div style={{ color: "red" }}>
              <p>{selectedAddress.fullAddress} </p>

              <p>{selectedCity} </p>
 
              <p>{selectedCountry.name} </p>
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
          <>
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
                {places.map((place) => (
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
                        : place.address.fullAddress || "No Address"}
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

export default CreatePlaceForm;
