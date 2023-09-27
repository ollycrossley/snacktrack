import { deleteReview, patchBusinessRating } from "@/api";

export default function DeleteReview({
  review_id,
  business_id,
  reviewRating,
  setTotalRating,
  setNumberOfRatings,
  setReviewsArray,
  reviewsArray,
}) {
  const handleClick = (e) => {
    confirm("Are you sure you want to delete this?");
    e.preventDefault();
    const ratingToTake = reviewRating * -1;
    const reviewToTake = reviewsArray[0];
    const copyReviews = [...reviewsArray];
    setReviewsArray((currReviews) => {
      const output = [...reviewsArray];
      output.shift();
      return output;
    });
    setTotalRating((currRating) => {
      return currRating - reviewRating;
    });
    setNumberOfRatings((currNum) => {
      return currNum - 1;
    });
    Promise.all([
      deleteReview(review_id),
      patchBusinessRating(business_id, {
        rating: ratingToTake,
        no_of_ratings: -1,
      }),
    ])
      .then(() => {
        alert("Review deleted");
      })
      .catch((e) => {
        setReviewsArray(copyReviews);
        setTotalRating((currRating) => {
          return currRating + reviewRating;
        });
        setNumberOfRatings((currNum) => {
          return currNum + 1;
        });
        alert("Error. Please refresh and try again");
      });
  };
  return (
    <button
      onClick={(e) => {
        handleClick(e);
      }}
      className={"button is-danger is-small"}
    >
      Delete Review
    </button>
  );
}
