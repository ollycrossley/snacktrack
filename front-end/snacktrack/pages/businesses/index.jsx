import NavBar from "../navbar";
import { useEffect, useState } from "react";
import { getBusinesses } from "@/api";
import React from "react";
import IndividualBusinessCard from "../../components/IndividualBusinessCard";
// import "../../../snacktrack/styles/globals.scss";

export default function allBusinesses() {
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showOnlyActive, setShowOnlyActive] = useState(false);
  const [ratingsIncreasing, setRatingsIncreasing] = useState(false);
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

  // const activeBusinesses = businesses.filter((business) => {
  //   return business.is_active === true;
  // });

  const handleClick = () => {
    setShowOnlyActive((active) => {
      return !active;
    });
  };

  const handleSelect = () => {
    setRatingsIncreasing((currValue) => {
      return !currValue;
    });
  };
  return (
    <>
      <NavBar />
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="level">
                <div className="level-left">
                  <div className="level-item">
                    {!showOnlyActive && (
                      <button className="button" onClick={handleClick}>
                        Hide inactive businesses
                      </button>
                    )}
                    {showOnlyActive && (
                      <button className="button" onClick={handleClick}>
                        Show inactive businesses
                      </button>
                    )}
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item">
                    {ratingsIncreasing && (
                      <button className="button" onClick={handleSelect}>
                        Sort by rating (highest first)
                      </button>
                    )}
                    {!ratingsIncreasing && (
                      <button className="button" onClick={handleSelect}>
                        Sort by rating (lowest first)
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <ul>
                <br />
                <IndividualBusinessCard
                  businesses={businesses}
                  showOnlyActive={showOnlyActive}
                  ratingsIncreasing={ratingsIncreasing}
                />
              </ul>
            </div>
          </div>
        </div>
      </section>
      <ul></ul>
    </>
  );
}
