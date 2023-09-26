import { useState } from "react";
import { postReview } from "./api/api_calls";
import { patchBusinessRating } from "@/api";

export default function AddReview({
  business_id,
  customer_id,
  customer_avatar_url,
  customer_username,
  reviewsArray,
  setReviewsArray,
  setTotalRating,
  setNumberOfRatings,
}) {
  const [ratings, setRatings] = useState([0, 1, 2, 3, 4, 5]);
  const [score, setScore] = useState(null);
  const [reviewBody, setReviewBody] = useState("");
  const handleRatingClick = (e, rating) => {
    e.preventDefault(e);
    score === rating ? setScore(null) : setScore(rating);
  };

  const handleBodyChange = (e) => {
    setReviewBody(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const review = {
      rating: score,
      customer: customer_id,
      business: business_id,
    };
    const copyReviewsArray = [...reviewsArray];
    const randomID = Math.floor(Math.random() * 1000000 + 1);
    const optimisticReview = {
      id: randomID,
      rating: score,
      customerUsername: customer_username,
      customerAvatarUrl: customer_avatar_url,
      customer_id,
    };

    if (reviewBody.length > 0) {
      review.body = reviewBody;
      optimisticReview.body = reviewBody;
    }
    setReviewsArray((currReviews) => {
      return [optimisticReview, ...currReviews];
    });
    setTotalRating((currRating) => {
      return currRating + score;
    });
    setNumberOfRatings((currNum) => {
      return currNum + 1;
    });
    Promise.all([
      postReview(review),
      patchBusinessRating(business_id, { rating: score, no_of_ratings: 1 }),
    ])
      .then(() => {
        alert("Review Posted");
        setReviewBody("");
        setScore(0);
      })
      .catch((e) => {
        setReviewsArray((currReviews) => {
          const output = [...currReviews];
          output.shift;
          return output;
        });
        setTotalRating((currRating) => {
          return currRating - score;
        });
        setNumberOfRatings((currNum) => {
          return currNum - 1;
        });
        alert(
          "There was a problem posting your review. Please try again later"
        );
      });
  };
  return (
    <div>
      <h2>Add a review</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {ratings.map((rating) => {
            return (
              <li key={rating}>
                <button
                  onClick={(e) => {
                    handleRatingClick(e, rating);
                  }}
                >
                  {rating}
                </button>
              </li>
            );
          })}
        </ul>
        <textarea
          name="review-body"
          id="review-body"
          cols="30"
          rows="10"
          value={reviewBody}
          onChange={handleBodyChange}
        ></textarea>
        <button disabled={!score}>Submit</button>
      </form>
    </div>
  );
}
