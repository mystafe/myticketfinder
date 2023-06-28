import React, { useEffect } from "react";
import Map from "./Map";
import Header from "./Header";
import Navbar from "./Navbar";
import { useState } from "react";

function EventDetails() {
  const [showEventDetailScreen, setShowEventDetailScreen] = useState(true);

  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTicketSubmit = (event) => {
    event.preventDefault();
    alert(`Purchased ${quantity} ticket(s) for ${date}`);
    setShowEventDetailScreen(!showEventDetailScreen);
  };
  return (
    <div className="detail">
      <Header />
      <Navbar />
      <div className="eventdetails">
        {showEventDetailScreen && (
          <div className="eventdetail">
            <div className="eventdetail__image">
              <img src="https://picsum.photos/200" alt="event" />
            </div>
            <div className="eventdetail__info">
              <h2>Event Name</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam voluptatum, quibusdam, quia, quos voluptates voluptatem
                quod voluptatibus quas doloribus quidem voluptate. Quisquam
                voluptatum,
              </p>
              <div className="eventdetail__info__date">
                <h3>Date</h3>
                <p>12/12/2021</p>
              </div>
              <div className="tn btn-purchase">
                <input
                  type="submit"
                  value="Purchase a ticket"
                  onClick={() =>
                    setShowEventDetailScreen(!showEventDetailScreen)
                  }
                />
              </div>
            </div>
          </div>
        )}

        {!showEventDetailScreen && (
          <div className="ticket-purchase-screen">
            <form onSubmit={handleTicketSubmit}>
              <label>
                Quantity:
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </label>
              <label>
                Date:
                <input type="date" value={date} onChange={handleDateChange} />
              </label>
              <input type="submit" value="Purchase" />
            </form>
          </div>
        )}

        <Map />
      </div>
    </div>
  );
}

export default EventDetails;
