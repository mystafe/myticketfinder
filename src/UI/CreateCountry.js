import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import CreateCountryForm from "../components/CreateCountryForm";

function CreateCountry() {
  return (
    <div className="create-country">
      <Header />
      <Navbar />
      <CreateCountryForm />
    </div>
  );
}

export default CreateCountry;
