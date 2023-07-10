import React from "react";
import "./Section.css";
import { Link } from "react-router-dom";

function Section({ name, data }) {
  // const featuredData = [""
  //   {
  //     id: 1,

  //     name: "Concert of Eminem",
  //     date: "2023-07-01",
  //     description:
  //       "Eminem is one of the best rappers in the world, and he is coming to your city!",
  //     price: 123.45,
  //     type: "Concert",
  //     image: [
  //       {
  //         urlAddress: "https://picsum.photos/230/300",
  //       },
  //     ],
  //     stage: {
  //       name: "Stage 1",
  //       location: "Istanbul,Turkiye",
  //     },
  //   },
  //   {
  //     id: 2,

  //     name: "Real Madrid -Barcelon Footbal Match",
  //     date: "2023-07-02",
  //     description:
  //       "Real Madrid and Barcelon are playing a football match in your city!",
  //     price: 123.45,
  //     type: "Football",
  //     image: [
  //       {
  //         urlAddress: "https://picsum.photos/220/300",
  //       },
  //     ],
  //     stage: {
  //       name: "Stage 2",
  //       location: "Bursa,Turkiye",
  //     },
  //   },
  //   {
  //     id: 3,

  //     name: "Shakspeare Theatre Play",
  //     date: "2023-07-03",
  //     description: "Shakspeare is very famous theatre...",
  //     price: 123.45,
  //     type: "Theatre",
  //     image: [
  //       {
  //         urlAddress: "https://picsum.photos/200/300",
  //       },
  //     ],
  //     stage: {
  //       name: "Stage 3",
  //       location: "Izmir,Turkiye",
  //     },
  //   },
  // ];

  return (
    <section className="section-tours" id="section-tours">
      <div className="u-center-text u-margin-bottom-big">
        <h2 className="heading-secondary">{name}</h2>
      </div>

      <div className="row">
        {data?.map((item) => (
          <div className="col-1-of-3">
            <div className="card" style={{ marginBottom: 25 }}>
              <div className="card__side card__side--front">
                <div
                  style={{
                    backgroundImage:
                      "url(" + item?.eventImages[0]?.urlAddress + ")",
                    backgroundSize: "stretch",
                  }}
                  className="card__picture card__picture--1"
                >
                  &nbsp;
                </div>
                <h4 className="card__heading">
                  <span className="card__heading-span card__heading-span--1">
                    {item.name}
                  </span>
                </h4>
                <div className="card__details">
                  <ul>
                    <p>{item.date}</p>
                    <p>{item.type}</p>
                    <p>{item.stage?.name}</p>
                    <p>{item.stage?.location}</p>
                  </ul>
                </div>
              </div>
              <div className="card__side card__side--back card__side--back-1">
                <div className="card__cta">
                  <div className="card__price-box">
                    <p className="card__price-only">Price</p>
                    <p className="card__price-value">{item?.price} TL</p>
                  </div>
                  <Link to={`/event/${item?.id}`} class="btn btn--white">
                    Go to details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="u-center-text u-margin-top-huge">
        <Link to="event" className="btn btn--green">
          Discover all
        </Link>
      </div>
    </section>
  );
}

export default Section;
