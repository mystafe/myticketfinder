import React from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Map({ geoLocation }) {
  const defaultProps = {
    center: {
      lat: geoLocation.latitude,
      lng: geoLocation.longitude,
    },
    zoom: 16,
  };

  // 41°00′49″N 28°57′18″E

  // geoLocation.latitude: 41.0774,
  // geoLocation.longitude: 28.9719,
  // lat: 41.0049,
  // lng: 49.2857,

  return (
    // Important! Always set the container height explicitly
    <div
      style={{
        height: "70vh",
        width: "75vw",
        border: 1,
        borderStyle: "solid",
        borderColor: "white",
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={defaultProps.center.lat}
          lng={defaultProps.center.lng}
          text="📌"
        />
      </GoogleMapReact>
    </div>
  );
}
