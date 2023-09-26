import { useState } from "react";
import axios from "axios";

export const getSingleBusiness = (
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
) => {
  setisLoading(true);
  axios
    .get(`https://snacktrack.onrender.com/api/businesses/${_id}`)
    .then(({ data }) => {
      setBusiness(data.business);
      setMonOpeningHours(data.business.opening_hours.monday);
      setTueOpeningHours(data.business.opening_hours.tuesday);
      setWedOpeningHours(data.business.opening_hours.wednesday);
      setThuOpeningHours(data.business.opening_hours.thursday);
      setFriOpeningHours(data.business.opening_hours.friday);
      setSatOpeningHours(data.business.opening_hours.saturday);
      setSunOpeningHours(data.business.opening_hours.sunday);
      setNumberOfRatings(data.business.no_of_ratings);
      setTotalRating(data.business.total_rating);

      setisLoading(false);
    })
    .catch((err) => {
      console.log(err, "error");
    });
};

export const getReviews = (_id, setReviewsArray) => {
  axios
    .get(`https://snacktrack.onrender.com/api/businesses/${_id}/reviews`)
    .then(({ data }) => {
      const reviewArr = data.reviews;
      const newReviewArr = reviewArr
        .map((review) => {
          const copyReview = { ...review };
          copyReview.customer_id = copyReview.customer._id;
          copyReview.customerUsername = copyReview.customer.username;
          copyReview.customerAvatarUrl = copyReview.customer.avatar_url;
          delete copyReview.customer;
          return copyReview;
        })
        .reverse();

      setReviewsArray(newReviewArr);
    })
    .catch((err) => {
      console.log(err, "reviews error");
    });
};

export const getCustomers = () => {
  axios
    .get("https://snacktrack.onrender.com/api/customers")
    .then(({ data }) => {
      return data;
    });
};

export const getBusinesses = () => {
  axios
    .get("https://snacktrack.onrender.com/api/businesses")
    .then(({ data }) => {
      return data;
    });
};

export const postCustomer = (customer) => {
  axios
    .post("https://snacktrack.onrender.com/api/customers", customer)
    .then(({ data }) => {});
};

export const postBusiness = (business) => {
  return axios
    .post("https://snacktrack.onrender.com/api/businesses", business)
    .then(({ data }) => {});
};

export const postReview = (review) => {
  return axios
    .post("https://snacktrack.onrender.com/api/reviews", review)
    .then(({ data }) => {});
};
