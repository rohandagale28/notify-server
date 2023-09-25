const mongoose = require("mongoose")

const requestSchema = new mongoose.Schema({
    sub: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    pending_request: {
        type: Array
    },
    user_list: {
        type: Array
    }
})

const requestModel = mongoose.model("request", requestSchema)

module.exports = requestModel