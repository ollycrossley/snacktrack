import axios from "axios";

// const baseURL = "http://localhost:9090"
const baseURL = "https://snacktrack.onrender.com";

export const getBusinesses = () => {
  return axios.get(`${baseURL}/api/businesses`).then((r) => r.data.businesses);
};

export const getBusiness = (business_id) => {
  return axios
    .get(`${baseURL}/api/businesses/${business_id}`)
    .then((r) => r.data.business);
};

/**
 * @param {Object} businessObject - Business Object
 * @return {Object}
 */
export const postBusiness = (business) => {
  return axios
    .post("https://snacktrack.onrender.com/api/businesses", business)
    .then(({ data }) => {
      return data;
    });
};

export const patchBusiness = (patchObject, business_id) => {
  return axios
    .patch(`${baseURL}/api/businesses/${business_id}`, patchObject)
    .then((r) => r.data.business);
};

export const getCustomers = () => {
  return axios.get(`${baseURL}/api/customers`).then((r) => r.data.customers);
};

export const getCustomer = (customer_id) => {
  return axios
    .get(`${baseURL}/api/customers/${customer_id}`)
    .then((r) => r.data.customer);
};

/**
 * @param {Object} customerObject - Customer Object
 * @param {String} customerObject.username - Username
 * @param {String} customerObject.email - Email
 * @param {String} customerObject.avatar_url - Avatar URL
 * @param {String} customerObject.password - Password
 * @return {Object}
 */
export const postCustomer = (customerObject) => {
  return axios
    .post(`${baseURL}/api/customers`, customerObject)
    .then((r) => r.data.customer);
};

export const getReviewByBusiness = (business_id) => {
  return axios
    .get(`${baseURL}/api/businesses/${business_id}/reviews`)
    .then((r) => r.data.reviews);
};

export const getReview = (review_id) => {
  return axios
    .get(`${baseURL}/api/reviews/${review_id}`)
    .then((r) => r.data.review);
};

/**
 * @param {Number} review_id - Review ID
 * @param {Object} reviewPatch - Customer Object
 * @param {Number} reviewPatch.rating - Rating
 * @param {String} reviewPatch.body - Review Body
 * @return {Object}
 */
export const patchReview = (review_id, reviewPatch) => {
  return axios
    .patch(`${baseURL}/api/reviews/${review_id}`, reviewPatch)
    .then((r) => r.data.review);
};

export const deleteReview = (review_id) => {
  return axios.delete(`${baseURL}/api/reviews/${review_id}`);
};

export const patchBusinessRating = (business_id, businessPatch) => {
  return axios
    .patch(`${baseURL}/api/businesses/${business_id}`, businessPatch)
    .then((r) => r.data.business);
};

export const postReview = (review) => {
  return axios
    .post("https://snacktrack.onrender.com/api/reviews", review)
    .then(({ data }) => {});
};

export const getReviews = (_id, setReviewsArray) => {
  return axios
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
  return axios
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
