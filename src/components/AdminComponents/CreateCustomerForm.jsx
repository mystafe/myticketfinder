import React from "react";
import { useContext } from "react";
import { AppContext } from "../../context/GlobalContext";
import Select from "react-select";

import { useState } from "react";

function CreateCustomerForm({ createCustomer, deleteCustomer }) {
  const { allCities, allCountries, allCustomers, allAddresses, loading } =
    useContext(AppContext);

  const [firstname, setFirstname] = useState(
    `Name  ${Math.floor(Math.random() * 100).toFixed()}`
  );
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState(
    `Surname  ${Math.floor(Math.random() * 100).toFixed()}`
  );
  const [username, setUsername] = useState(
    `Test User  ${Math.floor(Math.random() * 100).toFixed()}`
  );
  const [password, setPassword] = useState("password123");
  const [email, setEmail] = useState("test@test.com");
  const [phone, setPhone] = useState("123456789");
  const [addressId, setAddressId] = useState(0);
  const [cityId, setCityId] = useState(null);
  const [addressName, setAddressName] = useState("sample address");
  const [fullAddress, setFullAddress] = useState("sample full adress");
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

  const handleAddress = (id) => {
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

  const handleCity = (id) => {
    setCityId(id);
    const city = allCities.find((city) => city.id === id);
    setSelectedCity(city.name);
  };
  const handleCountry = (id) => {
    setAvailableCities(allCities.filter((city) => city.countryId === id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    var myCity = null;
    if (addressId != null && addressId !== 0) {
      const myAddress = allAddresses.find(
        (address) => address.id === addressId
      );

      myCity = allCities.find((city) => city.id === myAddress.city.id);

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
    } else if (addressId == null || addressId === 0) {
      myCity = allCities.find((city) => city.id === cityId);
      if (cityId == null || cityId === 0) {
        alert("Please select a city");
        return;
      }
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
        cityId: myCity.id,
        cityName: myCity.name,
        addressName,
        fullAddress,
        latitude,
        longitude,
      };
      createCustomer(customer);
    }
    setFirstname(`Name  ${Math.floor(Math.random() * 100).toFixed()}`);
    setLastname(`Surname  ${Math.floor(Math.random() * 100).toFixed()}`);
    setUsername(`Test User  ${Math.floor(Math.random() * 100).toFixed()}`);
    setFullAddress("Sample Address");
    setSelectedCity(null);
  };
  const handleDeleteCustomer = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this country?"
    );
    if (confirmDelete) {
      deleteCustomer(id);
    }
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
          <Select
            placeholder="Select Address"
            onChange={(e) => {
              handleAddress(e.value);
            }}
            options={[{ value: 0, label: "Create New Address" }].concat(
              allAddresses.map((address) => ({
                value: address.id,
                label: address.fullAddress,
              }))
            )}
          />
        </div>

        {showAdditionalFields && (
          <>
            <div className="form-group">
              <label htmlFor="country-id">Counrty</label>
              <Select
                onChange={(e) => {
                  handleCountry(e.value);
                }}
                options={allCountries.map((country) => ({
                  value: country.id,
                  label: country.name,
                }))}
              />
            </div>

            <div className="form-group">
              <label htmlFor="city-id">City</label>
              <Select
                onChange={(e) => {
                  handleCity(e.value);
                }}
                options={availableCities.map((city) => ({
                  value: city.id,
                  label: city.name,
                }))}
              />
            </div>
            <div className="form-group">
              <label htmlFor="addressname">Address Name</label>
              <input
                type="text"
                id="addressname"
                value={addressName}
                onChange={(e) => setAddressName(e.target.value)}
              />
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
              <p>{selectedAddress?.addressName ?? "no address"}</p>
              <p>{selectedAddress?.fullAddress ?? "no address"} </p>

              <p>{selectedCity} </p>

              <p>{selectedCountry?.name} </p>
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
                  <th>Id</th>
                  <th>Fullname</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Addressname</th>
                  <th>FullAddress</th>
                  <th>City</th>
                  <th>Action</th>
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
                    <td>{customer.id}</td>
                    <td>{customer.fullname}</td>
                    <td>{customer.username}</td>
                    <td>{customer.password}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.addressName}</td>
                    <td>{customer.fullAddress}</td>
                    <td>{customer.cityName} </td>
                    <td>
                      <button
                        onClick={() => {
                          handleDeleteCustomer(customer.id);
                        }}
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
      </div>
    </div>
  );
}
export default CreateCustomerForm;
