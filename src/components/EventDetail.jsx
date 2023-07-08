import React from "react";
import "./EventDetail.css";
import Select from "react-select";

import Slider from "./Slider/Slider";
import Map from "./Map/Map";

function EventDetail() {
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [selectedSeats, setSelectedSeats] = React.useState([]);
  const [seats, setSeats] = React.useState([
    { id: 1, name: "seat 1", category: 1 },
    { id: 2, name: "seat 2", category: 2 },
    { id: 3, name: "seat 3", category: 1 },
  ]);
  console.log("selectedCategory", selectedCategory);
  console.log("selectedSeats", selectedSeats);
  const concertImages = [
    {
      id: 1,
      url: "https://picsum.photos/610/300",
      description: "Pic 1",
    },
    {
      id: 2,
      url: "https://picsum.photos/620/300",
      description: "Pic 2",
    },
    {
      id: 3,
      url: "https://picsum.photos/630/300",
      description: "Pic 3",
    },
  ];

  return (
    <div className="eventdetails">
      <h1>Event Name</h1>
      <Slider imgData={concertImages} />

      <div className="eventdetail">
        <h2>Event Description</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptatum, quibusdam, quia, quae voluptates voluptatem quod
          consequatur voluptatibus quos doloribus quidem. Quisquam voluptatum,
        </p>
        <div className="eventdetail__info">
          <div className="eventdetail__info__date">
            <h2>Date</h2>
            <p>12/07/2023</p>
            <p>12:00</p>
          </div>

          <div className="eventdetail__info__price">
            <h2>Price</h2>
            <p> 120 TL</p>
          </div>
          <div className="evetdetail__info__address">
            <h2>Address</h2>
            <p>Lutfi Kirdar Kongre Mrkz.</p>
            <p>Cemil Topuzlu Sahnesi</p>
            <p>Osmanbey mh Sadi sk No:3</p>

            <p>Istanbul, Turkiye</p>

            <div className="btn btn-sm btn-location">Show Location</div>
          </div>

          <div className="eventdetail__info__seats">
            <h2>Seat Selection</h2>
            <div className="input-group">
              <Select
                placeholder="Select Category"
                id="category"
                options={[
                  { value: 1, label: "Vip" },
                  { value: 2, label: "Normal" },
                ]}
                onChange={(e) => {
                  setSelectedCategory(e.value);
                  console.log("e", e);
                }}
              />
            </div>
            <div className="input-group">
              <Select
                placeholder="Select Seat"
                isMulti
                options={seats
                  .filter((seat) => seat.category === selectedCategory)
                  .map((seat) => {
                    return { value: seat.id, label: seat.name };
                  })}
                onChange={(e) => {
                  setSelectedSeats(e.map((seat) => seat.value));
                  console.log("e", e);
                }}
              />
            </div>
          </div>
          <div className="btn  btn-purchase">
            <h2>Buy Ticket</h2>
          </div>
        </div>
      </div>

      <div className="eventdetail__map">
        <p> Map </p>
        <Map geoLocation={{ latitude: 41.0774, longitude: 28.9719 }} />,
      </div>
    </div>
  );
}

export default EventDetail;
