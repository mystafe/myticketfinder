import React from "react";

const cardComponent = (props) => {
  return (
    <div className="card transition">
      <h2 className="transition">{props.title}</h2>
      <p>{props.description}</p>
      <div className="cta-container transition">
        <a href="#" className="cta">
          Purchase a ticket
        </a>
      </div>
      <div
        className="card_circle transition"
        style={{
          backgroundImage: `url(${props.image})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center bottom",
        }}
      />
    </div>
  );
};

function TestDiv() {
  const image1 = "https://picsum.photos/320/240";
  const image2 = "https://picsum.photos/310/300";
  const image3 = "/image.jpeg";
  const image4 = "https://picsum.photos/200/300";
  const image5 = "https://picsum.photos/300/200";
  const image6 = "https://picsum.photos/270/300";
  const image7 = "https://picsum.photos/305/270";

  const cards = [
    {
      title: "Emilie's Concert",
      image: image1,
      description:
        "Aenean lacinia bibendum nulla sed consectetur. Donec ullamcorper nulla non metus auctor fringilla.",
    },
    {
      title: "Concert of Madonna",
      image: image2,
      description: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "Concert of Eminem",
      image: image3,
      description: "Lorem ipsum, beatae eligendi quidem, est in!   ",
    },
    {
      title: "Linkin Park Concert",
      image: image4,
      description: "Lqui sint! Minus ex ipsam laudantium explicabo.",
    },
    {
      title: "Concert of Metallica",
      image: image5,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    },
    {
      title: "Concert of Queen",
      image: image6,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    },
    {
      title: "Concert of AC/DC",
      image: image7,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    },
  ];

  return (
    <>
      <div className="card-container">
        {cards.map((card) => {
          return cardComponent(card);
        })}
      </div>
    </>
  );
}

export default TestDiv;
