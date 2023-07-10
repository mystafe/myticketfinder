import React from "react";
import "./Section.css";
import { Link } from "react-router-dom";

function Section({ name, data }) {
  const eventTypes = {
    1: "Concert",
    2: "Football",
    3: "Art",
    4: "Cinema",
    5: "Other",
  };
  console.log("event type length", eventTypes.length);
  return (
    <section className="section-tours" id="section-tours">
      <div className="u-center-text u-margin-bottom-big">
        <h2 className="heading-secondary">{name}</h2>
      </div>

      <div className="row">
        {data?.length === 0 || data == null ? (
          <div className="u-center-text u-margin-bottom">
            <h2 className="">No event found</h2>
          </div>
        ) : (
          ""
        )}

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
                    <p>
                      <i>
                        {new Date(item.date).toLocaleDateString("tr-TR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                        {new Date(item.date)
                          .toLocaleTimeString("tr-TR", {
                            hour: "numeric",
                            minute: "numeric",
                          })
                          .split(" ")
                          .join(" ")
                          .replace(",", "")}
                      </i>
                    </p>
                    <hr />
                    <p>
                      {item.description.length % 5 < 3 ? "Istanbul" : "Ankara"}
                    </p>

                    <p>{item.description.slice(0, 30) + ".."}</p>
                    <hr />
                    <p>
                      <strong>{eventTypes[item.eventType]}</strong>{" "}
                    </p>
                    <hr />

                    <p>{item.type}</p>
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
    </section>
  );
}

export default Section;
