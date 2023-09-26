import NavBar from "../navbar";
import { useEffect, useState } from "react";
import { getBusinesses } from "@/api";
import React from "react";
import IndividualBusinessCard from "./components/IndividualBusinessCard";
// import "../../../snacktrack/styles/globals.scss";

export default function allBusinesses() {
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getBusinesses().then((r) => {
      setBusinesses(r);
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <NavBar />
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <ul>
                <IndividualBusinessCard businesses={businesses} />
              </ul>
            </div>
          </div>
        </div>
      </section>
      <ul></ul>
    </>
  );
}
