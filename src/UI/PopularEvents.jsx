import React from "react";
import Section from "../components/Section";

function PopularEvents() {
  const populars = {
    name: "Popular Events",
    data: [
      {
        id: 1,

        name: "Concert of Eminem",
        date: "2023-07-01",
        description:
          "Eminem is one of the best rappers in the world, and he is coming to your city!",
        price: 123.45,
        type: "Concert",
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
      {
        id: 2,

        name: "Real Madrid -Barcelon Footbal Match",
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
        id: 3,

        name: "Shakspeare Theatre Play",
        date: "2023-07-03",
        description: "Shakspeare is very famous theatre...",
        price: 123.45,
        type: "Theatre",
        image: [
          {
            urlAddress: "https://picsum.photos/200/300",
          },
        ],
        stage: {
          name: "Stage 3",
          location: "Izmir,Turkiye",
        },
      },
    ],
    link: "/popular",
  };
  return <Section props={populars} />;
}

export default PopularEvents;
