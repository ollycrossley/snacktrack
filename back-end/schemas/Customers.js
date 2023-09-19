import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({

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
    avatar: {
        type: String,
        required: false
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

const Customer = mongoose.model("Customer", CustomerSchema)
module.exports = Customer