import React from "react";
import "./EventDetail.css";
import Select from "react-select";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../context/GlobalContext";

import Slider from "../components/Slider/Slider";
import Map from "../components/Map/Map";
import { useParams } from "react-router-dom";
import axios from "axios";

function EventDetail() {
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState(null);
  const [address, setAddress] = useState(null);
  const [eventStage, setEventStage] = useState(null);
  const [stage, setStage] = useState(null);
  const [place, setPlace] = useState(null);
  const [totalprice, setTotalPrice] = useState(0);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const id = useParams().id;

  const { allEvents } = useContext(AppContext);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [eventSeats, setEventSeats] = useState([]);
  const [seats, setSeats] = useState([
    { id: 1, name: "seat 1", category: 1 },
    { id: 2, name: "seat 2", category: 2 },
    { id: 3, name: "seat 3", category: 1 },
  ]);

  const concertImages2 = [
    {
      id: 1,
      urlAddress: "https://picsum.photos/610/300",
      description: "Pic 1",
    },
    {
      id: 2,
      urlAddress: "https://picsum.photos/620/300",
      description: "Pic 2",
    },
    {
      id: 3,
      urlAddress: "https://picsum.photos/630/300",
      description: "Pic 3",
    },
  ];

  const concertImages = [];

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://localhost:7169/api/event/" + id);
      setEvent(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEventStage = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://localhost:7169/api/eventstage/");

      const myEventStage = res.data.find(
        (eventStage) => eventStage?.eventId == id
      );
      setEventStage(myEventStage);
      if (myEventStage != null) setStage(myEventStage?.stage);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const fetchEventSeats = async () => {
    try {
      setLoading(true);
      if (eventStage != null) {
        const res = await axios.get("https://localhost:7169/api/eventseat/");

        const myEventSeats = res?.data.filter(
          (eventSeat) => eventSeat?.eventStageId == eventStage?.id
        );
        setEventSeats(myEventSeats);
        console.log("myEventSeats", myEventSeats);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const setAvailableSeats = () => {
    if (eventSeats.length === 0) return;
    console.log("step1");
    const myEventSeats = eventSeats
      .filter((eventSeat) => eventSeat.isSold === false)
      .map((eventSeat) => {
        return {
          id: eventSeat.id,
          name: eventSeat.seat.name,
          category: eventSeat.seat.type,
        };
      });
    setSeats(myEventSeats);
  };
  const fetchPlace = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://localhost:7169/api/place/");
      const myPlace = res.data.find((place) => place.id == stage?.placeId);

      setPlace(myPlace);
      setAddress(myPlace?.address);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const geoDecoder = async () => {
    console.log("DECODERDECODER");
    const lt = place?.address?.geoLocation.slice(1).split(",")[0];
    const ln = place?.address?.geoLocation.split(",")[1].slice(0, -1);
    setLat(ln);
    setLng(lt);
    setLat(41.0774);
    setLng(28.9719);
    setLatitude(41.0774);
    setLongitude(28.9719);

    // setLat(41.0787);
    // setLng(29.0013);
  };
  useEffect(() => {
    fetchEvent();
    fetchEventStage();
    fetchEventSeats();
    fetchPlace();
    setAvailableSeats();
    geoDecoder();
  }, []);

  const createTicket = async (seatId) => {
    try {
      setLoading(true);
      const res = await axios.post("https://localhost:7169/api/ticket/", {
        customerId: 1, //TODO: change this to logged in user id
        eventSeatId: seatId,
      });
      alert("Ticket created successfully");
      console.log(res.data);
    } catch (error) {
      console.log(error);
      alert("Ticket creation failed");
    } finally {
      setLoading(false);
    }
  };
  const handlePurcase = async (selectedSeats) => {
    console.log("selectedSeats", selectedSeats);
    selectedSeats.map((seat) => createTicket(seat));
    setSeats([]);
    setSelectedSeats([]);
    setTotalPrice(0);
    fetchEvent();
    fetchEventStage();

    fetchEventSeats();
    fetchPlace();
    setAvailableSeats();
    geoDecoder();
  };

  console.log("event from menu", event);
  console.log("seats from menu:", seats);

  return (
    <div className="eventdetails">
      <h1>Event Name</h1>
      {/* <Slider imgData={concertImages} /> */}
      <Slider imgData={event?.eventImages} />

      <div className="eventdetail">
        <div
          style={{
            display: "block;",
            minWidth: "100rem",
            justifyContent: "center",
            margin: "auto",
            fontSize: "4rem",
          }}
        >
          <p> {event?.name}</p>
        </div>
        <p>{event?.description}</p>
        <div className="eventdetail__info">
          <div className="eventdetail__info__date">
            <h2>Date</h2>
            <p>{event?.date.slice(0, 10)} - 12/07/2023</p>
            <p>{event?.date.slice(11, 16)} -12:00</p>
          </div>

          <div className="eventdetail__info__price">
            <h2>Event Price</h2>
            <p>{event?.price}</p> <br />
            <h2>Total Price</h2>
            <p>{totalprice} TL</p> <br />
            <h2>Selected Seats</h2>
            <ul>
              {selectedSeats.map((seat) => (
                <span>{seat} </span>
              ))}
            </ul>
          </div>

          <div className="evetdetail__info__address">
            <h2>Address</h2>
            <p> {event?.eventStages[0].name} Lutfi Kirdar Kongre Mrkz.</p>
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
                  { value: 0, label: "Normal" },
                ]}
                onChange={(e) => {
                  setAvailableSeats();
                  setSelectedCategory(e.value);
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

                  setTotalPrice(
                    e.reduce((acc, seat) => {
                      const seatPrice = +eventSeats.find(
                        (eventSeat) => eventSeat.id === seat.value
                      )?.eventPrice;
                      return acc + seatPrice;
                    }, 0)
                  );
                }}
              />
            </div>
          </div>
          <div
            className="btn  btn-purchase"
            onClick={() => handlePurcase(selectedSeats)}
          >
            <h2>Buy Ticket</h2>
          </div>
        </div>
      </div>

      <div className="eventdetail__map">
        <p> Map </p>
        <Map geoLocation={{ latitude: 41.0774, longitude: 28.9719 }} />,
        {console.log(+lat, +lng)}
        <Map geoLocation={{ latitude, longitude }} />,
        {/* <Map geoLocation={{ latitude: {address.geoLocation.la} longitude: 28.9719 }} />, */}
        {/* {console.log("!1!!!", place?.address)}
        {console.log("!222!!!", place?.address?.geoLocation[0])}
        {console.log("!333!!!", lat, lng)} */}
      </div>
    </div>
  );
}

export default EventDetail;
