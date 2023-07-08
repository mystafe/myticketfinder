import React from "react";
import Section from "../components/Section";

function FootballEvents() {
  const footballEvents = {
    name: "Football Events",
    data: [
      {
        id: 1,

        name: "Real Madrid -Barcelona Footbal Match",
        date: "2023-07-02",
        description:
          "Real Madrid and Barcelon are playing a football match in your city!",
        price: 123.45,
        type: "Football",
        image: [
          {
            urlAddress: "https://picsum.photos/220/300",
          },
        ],
        stage: {
          name: "Stage 2",
          location: "Bursa,Turkiye",
        },
      },
      {
        id: 2,
        name: "Galatasaray - Fenerbahce Football Match",
        date: "2023-07-02",
        description:
          "Galatasaray and Fenerbahce are playing a football match in your city!",
        price: 123.45,
        type: "Football",
        image: [
          {
            urlAddress: "https://picsum.photos/230/300",
          },
        ],
        stage: {
          name: "Stage 1",
          location: "Istanbul,Turkiye",
        },
      },
    ],
    link: "/football-events",
  };

  return <Section props={footballEvents} />;
}

export default FootballEvents;
