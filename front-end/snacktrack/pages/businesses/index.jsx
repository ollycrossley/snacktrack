import { getBusiness } from "@/api";
import NavBar from "../navbar";
import { useEffect, useState } from "react";
import { getBusinesses } from "@/api";
import React from "react";
import BusinessListItem from "./components/businessListItem";

export default function allBusinesses() {
  const [businesses, setBusinesses] = useState();
  const [isLoading, setIsLoading] = useState(true);
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
      <br></br>
      <h1>Businesses List{console.log(businesses)}</h1>
      <br></br>
      <table>
        <thead>
          <tr>Business Name</tr>
          <tr>Rating</tr>
        </thead>
        <tbody>
          {businesses.map((business) => (
            <BusinessListItem business={business} />
          ))}
        </tbody>
      </table>
      <ul></ul>
    </>
  );
}
