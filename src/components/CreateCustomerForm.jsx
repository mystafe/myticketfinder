import React from "react";

import { useState } from "react";

function CreateCustomerForm({
  allCustomers,
  allAddresses,
  allCities,
  allCountries,
  createCustomer,
  deleteCustomer,
  createAddress,
  fetchAddress,
  loading,
}) {
  const [firstname, setFirstname] = useState("Test");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("User");
  const [username, setUsername] = useState("testuser");
  const [password, setPassword] = useState("password123");
  const [email, setEmail] = useState("test@test.com");
  const [phone, setPhone] = useState("123456789");
  const [addressId, setAddressId] = useState(0);
  const [countryId, setCountryId] = useState(3);
  const [cityId, setCityId] = useState(null);
  const [fullAddress, setFullAddress] = useState("sample address");
  const [latitude, setLatitude] = useState("41.2");
  const [longitude, setLongitude] = useState("23.4");
  const [selectedTable, setSelectedTable] = useState(null);
  const [availableCities, setAvailableCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAdditionalFields, setShowAdditionalFields] = useState(true);

  const handleSelectedRow = (id) => {
    setSelectedTable(id);
  };

  const handleUnselectedRow = () => {
    setSelectedTable(null);
  };

  const handleAddressId = (id) => {
    if (id === 0 || id == null) {
      setAddressId(null);
      setShowAdditionalFields(true);
      return;
    }
    setAddressId(id);
    const selectedAddress = allAddresses.find((address) => address.id === id);

    setSelectedAddress(selectedAddress);
    setSelectedCity(selectedAddress.city.name);

    setSelectedCountry(
      allCountries.find(
        (country) => country.id === selectedAddress.city.countryId
      )
    );
    setShowAdditionalFields(false);
  };

  const handleCityId = (id) => {
    setCityId(id);
    const city = allCities.find((city) => city.id === id);
    setSelectedCity(city.name);
  };
  const handleCountryId = (id) => {
    setCountryId(id);
    setAvailableCities(allCities.filter((city) => city.countryId === id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // const cityName = city.name;
    let myCity = null;
    if (addressId != null) {
      myCity = allAddresses.find((address) => address.id === addressId).city;
      setSelectedCity(myCity);
      const customer = {
        firstname,
        middlename,
        lastname,
        username,
        password,
        email,
        phone,
        addressId,
      };
      createCustomer(customer);
      setFirstname("");
      setMiddlename("");
      setLastname("");
    } else if (addressId == null) {
      myCity = allCities.find((city) => city.id === cityId);
      setSelectedCity(myCity);
    }

    const customer = {
      firstname,
      middlename,
      lastname,
      username,
      password,
      email,
      phone,
      addressId,
      cityId: myCity.id,
      fullAddress,
      latitude,
      longitude,
    };
    createCustomer(customer);

    setFirstname("");
    setMiddlename("");
    setLastname("");
    setUsername("");
    setPassword("");
    setEmail("");
    setPhone("");
    setAddressId(null);
    setCountryId(null);
    setCityId(null);
    setFullAddress("");
    setLatitude("");
    setLongitude("");

    setSelectedCity(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Create Customer</h2>
        <div className="form-group">
          <label htmlFor="firstname">Firstname</label>
          <input
            type="text"
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="middlename">Middlename</label>
          <input
            type="text"
            id="middlename"
            value={middlename}
            onChange={(e) => setMiddlename(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Lastname</label>

          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address-id">Address</label>
          <select
            value={addressId}
            onChange={(e) => {
              handleAddressId(e.target.value);
            }}
          >
            <option value={0}>Select Address</option>
            {allAddresses.map((address) => (
              <option key={address.id} value={address.id}>
                {address.fullAddress}
              </option>
            ))}
          </select>
        </div>

        {showAdditionalFields && (
          <>
            <div className="form-group">
              <label htmlFor="country-id">Counrty</label>
              <select
                value={countryId}
                onChange={(e) => {
                  handleCountryId(e.target.value);
                }}
              >
                <option value={null}>Select Country</option>
                {allCountries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="city-id">City</label>
              <select
                value={cityId}
                onChange={(e) => {
                  handleCityId(e.target.value);
                }}
              >
                <option value={null}>Select City</option>
                {availableCities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="fulladdress">Full Address</label>
              <input
                type="text"
                id="fulladdress"
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="text"
                id="latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="text"
                id="longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
            </div>
          </>
        )}

        {!showAdditionalFields && (
          <>
            <div className="form-group" style={{ color: "red" }}>
              <p>{selectedAddress?.fullAddress ?? "no address"} </p>
              {console.log("selectedAddress", selectedAddress)}

              <p>{selectedCity} </p>
              {console.log("selectedCity", selectedCity)}
              <p>{selectedCountry.name} </p>
            </div>
          </>
        )}

        <button type="submit">Create Customer</button>
      </form>
      <div className="customerlist">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            <h2>Customers</h2>
            <table>
              <thead>
                <tr>
                  <th>Fullname</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>FullAddress</th>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>
                {allCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    onMouseEnter={() => handleSelectedRow(customer.id)}
                    onMouseLeave={handleUnselectedRow}
                    className={
                      selectedTable === customer.id ? "selectedTable" : ""
                    }
                  >
                    <td>{customer.fullname}</td>
                    <td>{customer.username}</td>
                    <td>{customer.password}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.fullAddress}</td>
                    <td>{customer.cityName} </td>
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
export default CreateCustomerForm;
