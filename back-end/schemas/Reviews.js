import {Schema, SchemaTypes, model} from "mongoose";

const ReviewSchema = new Schema({

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
        type: SchemaTypes.ObjectId,
        ref: "Customer",
        required: true,
    },
    business: {
        type: SchemaTypes.ObjectId,
        ref: "Business",
        required: true,
    },

})

const Review = model("Review", ReviewSchema )
module.exports = Review