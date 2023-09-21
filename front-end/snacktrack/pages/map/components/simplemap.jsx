import GoogleMapReact from "google-map-react";
import React, {useEffect, useState} from "react";
import {getBusinesses} from "@/api";

export default function SimpleMap() {
  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  const [businesses, setBusinesses] = useState([]);

  const defaultProps = {
    center: {
      lat: 51.904512,
      lng: -2.1037056,
    },
    zoom: 5,
  };

  // zoom: 16,

  useEffect(() => {
    getBusinesses().then(businesses => setBusinesses(businesses))
    console.log(businesses)
  }, []);


  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >

        {businesses.map((driver) => {
          if (driver.isActive) {
            return (
              <AnyReactComponent
                lat={driver.location.latitude}
                lng={driver.location.longitude}
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
      </GoogleMapReact>
    </div>
  );
}
