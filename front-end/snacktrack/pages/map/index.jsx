"use client";

import NavBar from "../navbar";
import SimpleMap from "../../components/simplemap";
import Head from "next/head";
import Script from "next/script";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/user_context";
import { patchBusiness } from "@/api";

export default function Map() {
  const [myCrd, setMyCrd] = useState({});
  const { activeUser, setActiveUser } = useContext(UserContext);

  function success(pos) {
    const crd = pos.coords;
    setMyCrd(crd);
    // console.log("Your current position is:");
    // console.log(`Latitude : ${crd.latitude}`);
    // console.log(`Longitude: ${crd.longitude}`);
    // console.log(`More or less ${crd.accuracy} meters.`);
  }

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  function handleActive() {
    activeUser.is_active = !activeUser.is_active;
    patchBusiness(
      {
        is_active: activeUser.is_active,
        location: { latitude: myCrd.latitude, longitude: myCrd.longitude },
      },
      activeUser._id
    ).then((business) => setActiveUser(business));
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          console.log(result);
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
            console.log("We are in prompt mode!");
          } else if (result.state === "denied") {
            // do other things
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser");
    }
    console.log(navigator);
  }, []);

  return (
    <>
      <Head>
        <script
          src="https://kit.fontawesome.com/a1a2d1f110.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <NavBar />

      {activeUser ? (
        <div
          className={"container has-text-centered"}
          style={{ marginBottom: 25 }}
        >
          <div className={"columns is-centered mb-2"}>
            {"is_active" in activeUser ? (
              <div className={"column is-one-fifth"}>
                <button
                  className={`button ${
                    activeUser.is_active
                      ? "is-success is-light"
                      : "is-danger is-light"
                  }`}
                  onClick={handleActive}
                >
                  {activeUser.is_active ? "Currently Open" : "Press to open"}
                </button>
              </div>
            ) : null}
            <div className={"column is-one-fifth"}>
              <button
                className={"button is-link is-light"}
                onClick={() => window.location.reload()}
              >
                Refresh Location
              </button>
            </div>
          </div>
          <SimpleMap userLat={myCrd.latitude} userLong={myCrd.longitude} />
        </div>
      ) : (
        <div>
          <br />
          <br />
          <br />
          <h1 className={"title has-text-centered"}>
            You need to be logged in to use the map!
          </h1>
        </div>
      )}
    </>
  );
}
