import { getBusiness } from "@/api";
import NavBar from "../navbar";
import { useEffect, useState } from "react";
import { getBusinesses } from "@/api";
import React from "react";
import BusinessListItem from "./components/businessListItem";
import Link from "next/link";
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
      {console.log(businesses)}
      <NavBar />
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <ul>
                {businesses.map((business) => {
                  return (
                    <li
                      key={business.business_name}
                      className="$menu-item-hover-background-color"
                    >
                      <Link href={`/businesses/${business._id}`}>
                        <div className="card" id="business-card">
                          <div className="card-image"></div>
                          <div className="card-content">
                            <div className="media">
                              <div className="media-left"></div>
                              <div className="media-content">
                                <p className="title is-4">
                                  {business.business_name}
                                </p>
                                <p></p>
                                <p className="subtitle is-6">
                                  Rating: {business.total_rating}(
                                  {business.no_of_ratings})
                                </p>
                                <p className="subtitle is-6">
                                  {business.is_active === true
                                    ? "Active now"
                                    : "Inactive"}
                                </p>
                              </div>
                            </div>
                            <div className="content"></div>
                          </div>
                        </div>
                        <br></br>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <ul></ul>
    </>
  );
}
