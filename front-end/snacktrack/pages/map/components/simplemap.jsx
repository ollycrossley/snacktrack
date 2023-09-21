import GoogleMapReact from "google-map-react";
import React, { useState } from "react";

export default function SimpleMap() {
  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  const [drivers, setDrivers] = useState([
    {
      driver_id: 1,
      name: "Steve's Tacos",
      coords: [51.904512, -2.1037056],
      isActive: true,
    },
    {
      driver_id: 2,
      name: "Jim's Mornings",
      coords: [51.9047, -2.1037056],
      isActive: true,
    },
    {
      driver_id: 3,
      name: "Rose's Counters",
      coords: [51.904588, -2.1037056],
      isActive: false,
    },
  ]);

  const defaultProps = {
    center: {
      lat: 51.904512,
      lng: -2.1037056,
    },
    zoom: 16,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {drivers.map((driver) => {
          if (driver.isActive) {
            return (
              <AnyReactComponent
                lat={driver.coords[0]}
                lng={driver.coords[1]}
                text={
                  <span className={"icon is-size-4"}>
                    <i
                      className="fa-solid fa-location-dot"
                      style={{ color: "#ff0000" }}
                    ></i>
                  </span>
                }
              />
            );
          }
        })}

        {/*<AnyReactComponent
                    lat={51.904512}
                    lng={-2.1037056}
                    text="My Marker 4"
                />*/}
      </GoogleMapReact>
    </div>
  );
}
