import NavBar from "@/pages/navbar";
import { useEffect } from "react";
import { useState } from "react";
import { getSingleBusiness, getReviews } from "../api/api_calls";
import Reviews from "./components/businessreviews";

export async function getServerSideProps(context) {
  const { _id } = context.query;

  return {
    props: {
      _id,
    },
  };
}

export default function singleBusiness({ _id }) {
  const [business, setBusiness] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [monOpeningHours, setMonOpeningHours] = useState("");
  const [tueOpeningHours, setTueOpeningHours] = useState("");

  const [wedOpeningHours, setWedOpeningHours] = useState("");

  const [thuOpeningHours, setThuOpeningHours] = useState("");

  const [friOpeningHours, setFriOpeningHours] = useState("");
  const [satOpeningHours, setSatOpeningHours] = useState("");

  const [sunOpeningHours, setSunOpeningHours] = useState("");
  const [numberOfRatings, setNumberOfRatings] = useState("");
  const [totalRating, setTotalRating] = useState("");
  const [reviewsArray, setReviewsArray] = useState([{}]);

  useEffect(() => {
    getSingleBusiness(
      _id,
      setBusiness,
      setisLoading,
      setMonOpeningHours,
      setTueOpeningHours,
      setWedOpeningHours,
      setThuOpeningHours,
      setFriOpeningHours,
      setSatOpeningHours,
      setSunOpeningHours,
      setNumberOfRatings,
      setTotalRating
    );
    getReviews(_id, setReviewsArray);
  }, []);

  if (isLoading) return <h1> Loading, please wait....</h1>;

  return (
    <>
      <NavBar />
      <br></br>
      <h1>{business.business_name}</h1>
      <br></br>
      <h1>
        {business.is_active ? "Open Now!" : "This business is currently closed"}
      </h1>
      <br></br>
      <h1>Business Type: {business.category}</h1>
      <br></br>
      <ul>
        <li key="Monday">
          <h1 className="day">Monday:</h1>
          <h1 className="hours">
            {monOpeningHours[0]} - {monOpeningHours[1]}
          </h1>
        </li>
        <li key="Tuesday">
          <h1 className="day">Tuesday:</h1>
          <h1 className="hours">
            {tueOpeningHours[0]} - {tueOpeningHours[1]}
          </h1>
        </li>
        <li key="Wednesday">
          <h1 className="day">Wednesday:</h1>
          <h1 className="hours">
            {wedOpeningHours[0]} - {wedOpeningHours[1]}
          </h1>
        </li>
        <li key="Thursday">
          <h1 className="day">Thursday:</h1>
          <h1 className="hours">
            {thuOpeningHours[0]} - {thuOpeningHours[1]}
          </h1>
        </li>
        <li key="Friday">
          <h1 className="day">Friday:</h1>
          <h1 className="hours">
            {friOpeningHours[0]} - {monOpeningHours[1]}
          </h1>
        </li>
        <li key="Saturday">
          <h1 className="day">Saturday:</h1>
          <h1 className="hours">
            {satOpeningHours[0]} - {satOpeningHours[1]}
          </h1>
        </li>
        <li key="Sunday">
          <h1 className="day">Sunday:</h1>
          <h1 className="hours">
            {sunOpeningHours[0]} - {sunOpeningHours[1]}
          </h1>
        </li>
      </ul>
      <br></br>
      <h1>
        Average Review:{" "}
        {numberOfRatings === 0
          ? 0
          : Number(totalRating / numberOfRatings).toFixed(1)}
      </h1>
      <img src={business.menu_url} alt="the businesses menu" />
      <div>
        <h1>Reviews:</h1>
        <ul>
          {reviewsArray.map((review) => {
            return (
              <li key={`${review._id}`}>
                <h1>Username: {review.customerUsername}</h1>;
                <h1>{review.rating}/5</h1>
                <img src={review.customerAvatarUrl}></img>
                <p>{review.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
