import NavBar from "@/pages/navbar";
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { UserContext } from "@/contexts/user_context";
import { getSingleBusiness, getReviews } from "@/api";
import Reviews from "../../components/businessreviews";
import AddReview from "../../components/addReview";
import DeleteReview from "../../components/deleteReview";
import Head from "next/head";

export async function getServerSideProps(context) {
  const { _id } = context.query;

  return {
    props: {
      _id,
    },
  };
}

export default function singleBusiness({ _id }) {
  const { activeUser } = useContext(UserContext);
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
        <Head>
            <script
                src="https://kit.fontawesome.com/a1a2d1f110.js"
                crossOrigin="anonymous"
            />
        </Head>
      <NavBar />
        <div className={"container"}>
            <div className={"box"}>
                <p className={"title is-size-1"}>{business.business_name}</p>
                <p className={"subtitle"}>{business.category}</p>
                <span className={"icon-text mb-2 mr-4"}>
                    <span className={"icon pb-2"}><i className="fa-solid fa-star" style={{color: "#f1cb29"}}></i></span>
                    <span>{numberOfRatings === 0
                        ? 0
                        : Number(totalRating / numberOfRatings).toFixed(1)}</span>
                </span>
                <span className={"icon-text mb-2"}>
                    <span className={"icon pb-1"}><i className="fa-solid fa-circle-dot" style={{color: "#01b20d"}}></i></span>
                    <span>{business.is_active ? "Open" : "This business is currently closed"}</span>
                </span>

            </div>
            <br></br>

            <div className={"columns"}>
                <div className={"column is-half"}>
                    <div className={"box"}>
                        <h1 className={"title"}>Schedule</h1>
                        <table className={"table is-fullwidth"}>
                            <thead>
                                <tr>
                                    <th>Day</th>
                                    <th>Open</th>
                                    <th>Closed</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Monday</th>
                                    <td>{monOpeningHours[0]}</td>
                                    <td>{monOpeningHours[1]}</td>
                                </tr>
                                <tr>
                                    <th>Tuesday</th>
                                    <td>{tueOpeningHours[0]}</td>
                                    <td>{tueOpeningHours[1]}</td>
                                </tr>
                                <tr>
                                    <th>Wednesday</th>
                                    <td>{wedOpeningHours[0]}</td>
                                    <td>{wedOpeningHours[1]}</td>
                                </tr>
                                <tr>
                                    <th>Thursday</th>
                                    <td>{thuOpeningHours[0]}</td>
                                    <td>{thuOpeningHours[1]}</td>
                                </tr>
                                <tr>
                                    <th>Friday</th>
                                    <td>{friOpeningHours[0]}</td>
                                    <td>{friOpeningHours[1]}</td>
                                </tr>
                                <tr>
                                    <th>Saturday</th>
                                    <td>{satOpeningHours[0]}</td>
                                    <td>{satOpeningHours[1]}</td>
                                </tr>
                                <tr>
                                    <th>Sunday</th>
                                    <td>{sunOpeningHours[0]}</td>
                                    <td>{sunOpeningHours[1]}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={"column is-half"}>
                    <div className={"box"}>
                        <p className={"title"}>About</p>
                        <p className={"subtitle"}>Bio</p>
                    </div>
                </div>
            </div>
            <br></br>
            {activeUser._id && !activeUser.is_active ? (
                <AddReview
                    business_id={business._id}
                    customer_id={activeUser._id}
                    customer_avatar_url={activeUser.avatar_url}
                    customer_username={activeUser.username}
                    reviewsArray={reviewsArray}
                    setReviewsArray={setReviewsArray}
                    setTotalRating={setTotalRating}
                    setNumberOfRatings={setNumberOfRatings}
                />
            ) : null}
            <img src={business.menu_url} alt="the businesses menu"/>
            <div>
                <h1>Reviews:</h1>
                <ul>
                    {reviewsArray.map((review) => {
                        return (
                            <li key={`${review._id}`}>
                                <h1>Username: {review.customerUsername}</h1>
                                <h1>{review.rating}/5</h1>
                                <img src={review.customerAvatarUrl}></img>
                                <p>{review.body}</p>
                                {activeUser._id === review.customer_id ? (
                                    <DeleteReview
                                        review_id={review._id}
                                        business_id={business._id}
                                        reviewRating={review.rating}
                                        setTotalRating={setTotalRating}
                                        setNumberOfRatings={setNumberOfRatings}
                                        setReviewsArray={setReviewsArray}
                                        reviewsArray={reviewsArray}
                                    />
                                ) : null}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    </>
  );
}
