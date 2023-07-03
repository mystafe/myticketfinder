import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function CreateCustomerForm() {
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState(null);
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
  const [addresses, setAddresses] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState(null);
  const [availableCities, setAvailableCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCountryId, setSelectedCountryId] = useState(null);
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
    console.log("id", id);
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

  const handleCityId = (id) => {
    setCityId(id);
    const city = cities.find((city) => city.id == id);
    setSelectedCity(city.name);
  };
  const handleCountryId = (id) => {
    setCountryId(id);
    setAvailableCities(cities.filter((city) => city.countryId == id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const GeoLocation = `[${latitude},${longitude}]`;

    // const cityName = city.name;
    let myCity = null;
    if (addressId != null) {
      console.log("addressId", addressId);
      myCity = addresses.find((address) => address.id == addressId).city;
      setSelectedCity(myCity);
    } else if (addressId == null) {
      console.log("addressId", addressId);
      myCity = cities.find((city) => city.id == cityId);
      setSelectedCity(myCity);
    }

    const fullname = `${firstname} ${middlename} ${lastname}`;

    axios
      .post("https://localhost:7169/api/customer", {
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
      })
      .then((res) => {
        setCustomerId(res.data.id);
        console.log(res);
        console.log(res.data);
      });

    console.log("myCity", myCity);
    setCustomers([
      ...customers,
      {
        fullname,
        username,
        password,
        email,
        phone,
        cityName: myCity.name,
        fullAddress: myCity.fullAddress || fullAddress,
        id: customerId,
        // id: customers.length + 1,
      },
    ]);

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
    setCustomerId(null);
    setSelectedCity(null);
  };

  useEffect(() => {
    const fetchCustomer = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://localhost:7169/api/customer");
        setCustomers(res.data);
        const res2 = await axios.get("https://localhost:7169/api/address");
        setAddresses(res2.data);
        const res3 = await axios.get("https://localhost:7169/api/city");
        setCities(res3.data);

        const res4 = await axios.get("https://localhost:7169/api/country");
        setCountries(res4.data);
        setAvailableCities(
          res3.data.filter((city) => city.countryId == countryId)
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
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
            {addresses.map((address) => (
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
          <>
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
                {customers.map((customer) => (
                  <tr
                    key={customer.id}
                    onMouseEnter={() => handleSelectedRow(customer.id)}
                    onMouseLeave={handleUnselectedRow}
                    className={
                      selectedTable == customer.id ? "selectedTable" : ""
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
          </>
        )}
      </div>
    </>
  );
}
export default CreateCustomerForm;
