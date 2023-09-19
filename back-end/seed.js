// import mongoose from "mongoose";
const {createRefSet, findIdByRef} =  require("./utils");
const Customer = require('./schemas/Customers');
const Business = require('./schemas/Businesses');
const Review = require('./schemas/Reviews');

exports.seed = async (customers, businesses, reviews) => {
    await Customer.deleteMany()
    await Business.deleteMany()
    await Review.deleteMany()

    await Customer.insertMany(customers)
    await Business.insertMany(businesses)

    const customerDB = await Customer.find()
    const businessDB = await Business.find()

    const customerRefObj = createRefSet(customerDB, "username")
    const businessRefObj = createRefSet(businessDB, "business_name")

    const reviewsToAdd = findIdByRef(customerRefObj, businessRefObj, reviews)
    await Review.insertMany(reviewsToAdd)
}