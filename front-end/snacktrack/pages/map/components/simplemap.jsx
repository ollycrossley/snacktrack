import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  Marker,
  InfoWindow,
  InfoWindowF,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { getBusinesses } from "@/api";
import Link from "next/link";

export default function SimpleMap({ userLat, userLong }) {
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [modal, setModal] = useState(<></>);
  const [defLat, setDefLat] = useState(54);
  const [defLong, setDefLong] = useState(-2);
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
  });

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker, lat, long) => {
    setDefLat(lat);
    setDefLong(long);
    /*if (marker === activeMarker) {
            return;
        }*/
    setActiveMarker(marker);
  };

  const defaultProps = {
    center: {
      lat: defLat,
      lng: defLong,
    },
    zoom: 13,
  };

  // zoom: 16,

  useEffect(() => {
    setIsLoading(true);
    getBusinesses().then((businesses) => {
      setBusinesses(businesses);
      setIsLoading(false);
    });
  }, []);
  useEffect(() => {
    setDefLat(userLat);
    setDefLong(userLong);
  }, [userLat, userLong]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return isLoaded ? (
    // Important! Always set the container height explicitly
    <div>
      <GoogleMap
        mapContainerStyle={{ height: "100vh", width: "100%" }}
        center={defaultProps.center}
        zoom={defaultProps.zoom}
        onClick={() => setActiveMarker(null)}
        onLoad={(map) => {
          const bounds = new window.google.maps.LatLngBounds(
            defaultProps.center
          );
          //map.fitBounds(bounds);
          setMap(map);
        }}
      >
        {businesses.map((business) => {
          if (business.is_active === true) {
            return (
              <MarkerF
                position={{
                  lat: business.location.latitude,
                  lng: business.location.longitude,
                }}
                icon={{
                  url: "https://i.ibb.co/cQPqCjF/custom-snacktrack-icon.png",
                  scaledSize: new google.maps.Size(38, 38),
                }}
                onClick={(e) => {
                  handleActiveMarker(
                    business.business_name,
                    business.location.latitude,
                    business.location.longitude
                  );
                }}
              >
                {activeMarker === business.business_name ? (
                  <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                    <div>
                      <Link href={`/businesses/${business._id}`}>
                        <p>{business.business_name}</p>
                      </Link>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&origin=${userLat}%2C${userLong}&destination=${business.location.latitude}%2C${business.location.longitude}`}
                      >
                        Get Directions
                      </a>
                    </div>
                  </InfoWindowF>
                ) : null}
              </MarkerF>
            );
          }
        })}
        <MarkerF
          position={{
            lat: userLat,
            lng: userLong,
          }}
          icon={{
            url: "https://i.ibb.co/YkJj66j/user-snacktrack-icon.png",
            scaledSize: new google.maps.Size(38, 38),
          }}
        ></MarkerF>
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}
