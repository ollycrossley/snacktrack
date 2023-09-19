import mongoose from "mongoose";

const BusinessSchema = new mongoose.Schema({

    created_at: {
        type: Date,
        default: Date.now()
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        // validate: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    },
    password: {
        type: String,
        required: true,
        // validate: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?\/~_+-=|\]).{8,32}$/
    },
    avatar_url: String,
    business_name: {
        type: String,
        required: true
    },
    owner_name: {
        type: String,
        required: true
    },
    business_bio: String,
    is_active: {
        type: Boolean,
        default: false
    },
    opening_hours: {
        monday: [String],
        tuesday: [String],
        wednesday: [String],
        thursday: [String],
        friday: [String],
        saturday: [String],
        sunday: [String],
    },
    logo_url: String,
    menu_url: [String],
    total_rating: {
        type: Number,
        default: 0
    },
    no_of_ratings: {
        type: Number,
        default: 0
    },
    location: {
        latitude: String,
        longitude: String
    }
})

const Business = mongoose.model("Business", BusinessSchema)
module.exports = Business