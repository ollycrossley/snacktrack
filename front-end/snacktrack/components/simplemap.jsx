import {GoogleMap, InfoWindowF, MarkerF, useJsApiLoader,} from "@react-google-maps/api";
import React, {useEffect, useState} from "react";
import {getBusiness, getBusinesses} from "@/api";
import Link from "next/link";

export default function SimpleMap({userLat, userLong}) {
    const [businesses, setBusinesses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [defLat, setDefLat] = useState(54);
    const [defLong, setDefLong] = useState(-2);
    const [map, setMap] = useState(null);
    const [isOpen, setIsOpen] = useState(false)

    const iconsList = {
        "Alcohol": "https://i.ibb.co/1q4ztwf/alcohol-snacktrack-icon.png",
        "Tea/Coffee": "https://i.ibb.co/2yKCvRJ/teacoffee-snacktrack-icon.png",
        "Other Soft Drinks": "https://i.ibb.co/ftfPB3n/other-drink-snacktrack-icon.png",
        "Burgers": "https://i.ibb.co/28mKjV6/burger-snacktrack-icon.png",
        "Cakes": "https://i.ibb.co/6tRXFDD/cakes-snacktrack-icon.png",
        "Chinese Food": "https://i.ibb.co/VgC8g9f/chinese-snacktrack-icon.png",
        "Doughnuts": "https://i.ibb.co/Qn6sysM/donut-snacktrack-icon.png",
        "Hot Dogs": "https://i.ibb.co/w6xg7xW/hotdog-snacktrack-icon.png",
        "Ice Cream": "https://i.ibb.co/fNx2ctN/icecream-snacktrack-icon.png",
        "Indian Food": "https://i.ibb.co/Hr5Pp5H/indian-snacktrack-icon.png",
        "Pizza": "https://i.ibb.co/qd19fXz/pizza-snacktrack-icon.png",
        "Street Food": "https://i.ibb.co/ChDsCKH/street-snacktrack-icon.png",
        "Spanish Food": "https://i.ibb.co/px0SMT3/spanish-snacktrack-icon.png",
        "Gifts": "https://i.ibb.co/4dJvXhc/gifts-snacktrack-icon.png",
    }

    const {isLoaded} = useJsApiLoader({
        id: "google-map-script",
    });

    const [activeMarker, setActiveMarker] = useState(null);

    const handleMarkerClick = (marker, lat, long) => {
        //map?.panTo({lat: lat, lng: long})
        setActiveMarker(marker);
        setIsOpen(true);
    };

    const defaultProps = {
        center: {
            lat: defLat,
            lng: defLong,
        },
        zoom: 13,
    };

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
        <div>
            <GoogleMap
                mapContainerStyle={{height: "70vh", width: "100%"}}
                onClick={() => setActiveMarker(null)}
                onLoad={(map) => {
                    map.setZoom(13)
                    map.setCenter(defaultProps.center)
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
                                    url: (iconsList[business.category] || "https://i.ibb.co/cQPqCjF/custom-snacktrack-icon.png"),
                                    scaledSize: new google.maps.Size(38, 38),
                                }}
                                onClick={(e) => {
                                    handleMarkerClick(
                                        business.business_name,
                                        business.location.latitude,
                                        business.location.longitude
                                    );
                                }}
                            >
                                {isOpen && activeMarker === business.business_name ? (
                                    <InfoWindowF onCloseClick={() => setIsOpen(false)}>
                                        <div className={"has-text-left"}>
                                            
                                            <p><strong>{business.business_name}</strong></p>
                                            <p>{business.category}</p>

                                            {business.no_of_ratings === 0
                                                ? null
                                                : <p>★ {Number(business.total_rating / business.no_of_ratings).toFixed(1)}</p>}

                                            <hr className={"dropdown-divider"}/>

                                            <Link href={`/businesses/${business._id}`}>
                                                <p>More info</p>
                                            </Link>

                                            <a
                                                href={`https://www.google.com/maps/dir/?api=1&origin=${userLat}%2C${userLong}&destination=${business.location.latitude}%2C${business.location.longitude}`}
                                                target={"_blank"}
                                            >Get Directions</a>

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
