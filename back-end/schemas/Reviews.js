const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({

    created_at: {
        type: Date,
        default: Date.now()
    },
    body: String,
    rating: {
        type: Number,
        required: true
    },
    customer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Customer",
        required: true,
    },
    business: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Business",
        required: true,
    },

})

const Review = mongoose.model("Review", ReviewSchema )
module.exports = Review