import React from "react";

function CreateCountryForm() {
  return (
    <div>
      <h1>Create Country Form</h1>
      <label htmlFor="country-name">Country Name</label>
      <input type="text" id="country-name" />

      <button type="submit">Create Country</button>
    </div>
  );
}

export default CreateCountryForm;
