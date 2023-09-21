import GoogleMapReact from "google-map-react";
import React, {useEffect, useState} from "react";
import {getBusinesses} from "@/api";

export default function SimpleMap() {
  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const defaultProps = {
    center: {
      lat: 51.904512,
      lng: -2.1037056,
    },
    zoom: 1,
  };

  // zoom: 16,

  useEffect(() => {
    setIsLoading(true)
    getBusinesses()
        .then(businesses => {
          setBusinesses(businesses)
          setIsLoading(false)
        })

  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
        >
          {businesses.map(business => {
            if (business.is_active === true) {
              return (
                  <AnyReactComponent
                      lat={business.location.latitude}
                      lng={business.location.longitude}
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
