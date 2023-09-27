import { useState } from "react";
import { patchBusinessRating, postReview } from "@/api";
import moment from "moment";

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
  const [ratings, setRatings] = useState([1, 2, 3, 4, 5]);
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
      created_at: moment().toDate().toISOString(),
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
          output.shift();
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
    <div className={"mb-5"}>
      <form onSubmit={handleSubmit} className={"block"}>
        <article className={"media"}>
          <figure className={"media-left"}>
            <img className={"image is-64x64 profile-pic is-rounded"} src={customer_avatar_url} alt={"user comment avatar"}/>
          </figure>
          <div className={"media-content"}>
            <div className={"field"}>
              <span className={"icon-text"}>
          {ratings.map((rating) => {
            return (
                <span key={rating} className={`icon is-clickable ${rating <= score ? "has-text-warning" : null}`}>
                <i onClick={(e) => {handleRatingClick(e, rating);}} className={"fas fa-star"}/>
              </span>
            );
          })}
        </span>
            </div>
            <div className={"field"}>
              <p className={"control"}>
                        <textarea
                            className={"textarea"}
                          name="review-body"
                          id="review-body"
                          cols="30"
                          rows="2"
                          value={reviewBody}
                          onChange={handleBodyChange}
                        ></textarea>
              </p>
            </div>
            <div className={"field"}>
              <div className={"control"}>
                <button disabled={!score} type={"submit"} className={"button is-success"}>Submit</button>
              </div>
            </div>
          </div>
        </article>
      </form>
    </div>
  );
}
