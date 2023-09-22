import {GoogleMap, useJsApiLoader, MarkerF} from '@react-google-maps/api';

import React, {useEffect, useState} from "react";
import {getBusinesses} from "@/api";

export default function SimpleMap() {
    const [businesses, setBusinesses] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    // const [map, setMap] = useState(null)

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
    })

    const defaultProps = {
        center: {
            lat: 53.47225548949146,
            lng: -2.238625720021971,
        },
        zoom: 13,
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

    return isLoaded ? (
        // Important! Always set the container height explicitly
            <GoogleMap
                mapContainerStyle={{height: "100vh", width: "100%"}}
                center={defaultProps.center}
                zoom={defaultProps.zoom}
                onLoad={map => {
                    const bounds = new window.google.maps.LatLngBounds(defaultProps.center);
                    // map.fitBounds(bounds);
                }}
            >
                {businesses.map(business => {
                    if (business.is_active === true) {
                        return (
                            <MarkerF
                             position={{lat: business.location.latitude, lng: business.location.longitude}}
                             icon={{url: "https://i.ibb.co/cQPqCjF/custom-snacktrack-icon.png", scaledSize: new google.maps.Size(38, 38)}}
                            />

                        )
                    }
                })}
                <></>
            </GoogleMap>
    ) : <></>
}
