import axios from "axios";

// const baseURL = "http://localhost:9090"
const baseURL = "https://snacktrack.onrender.com/api"

export const getBusinesses = () => {
    return axios.get(`${baseURL}/api/businesses`).then(r => r.data.businesses)
}

export const getBusiness = (business_id) => {
    return axios.get(`${baseURL}/api/businesses/${business_id}`).then(r => r.data.business)
}

/**
 * @param {Object} businessObject - Business Object
 * @return {Object}
 */
export const postBusiness = (businessObject) => {
    return axios.post(`${baseURL}/api/businesses`, businessObject).then(r => r.data.business)
}

export const getCustomers = () => {
    return axios.get(`${baseURL}/api/customers`).then(r => r.data.customers)
}

export const getCustomer = (customer_id) => {
    return axios.get(`${baseURL}/api/customers/${customer_id}`).then(r => r.data.customer)
}

/**
 * @param {Object} customerObject - Customer Object
 * @param {String} customerObject.username - Username
 * @param {String} customerObject.email - Email
 * @param {String} customerObject.avatar_url - Avatar URL
 * @param {String} customerObject.password - Password
 * @return {Object}
 */
export const postCustomer = (customerObject) => {
    return axios.post(`${baseURL}/api/customers`, customerObject).then(r => r.data.customer)
}

export const getReviewByBusiness = (business_id) => {
    return axios.get(`${baseURL}/api/businesses/${business_id}/reviews`).then(r => r.data.reviews)
}

export const getReviews = () => {
    return axios.get(`${baseURL}/api/reviews`).then(r => r.data.reviews)
}

export const getReview = (review_id) => {
    return axios.get(`${baseURL}/api/reviews/${review_id}`).then(r => r.data.review)
}

/**
 * @param {Number} review_id - Review ID
 * @param {Object} reviewPatch - Customer Object
 * @param {Number} reviewPatch.rating - Rating
 * @param {String} reviewPatch.body - Review Body
 * @return {Object}
 */
export const patchReview = (review_id, reviewPatch) => {
    return axios.patch(`${baseURL}/api/reviews/${review_id}`, reviewPatch).then(r => r.data.review)
}

export const deleteReview = (review_id) => {
    return axios.delete(`${baseURL}/api/reviews/${review_id}`)
}