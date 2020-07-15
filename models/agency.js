const mongoose = require("mongoose");
const agencySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address_1: {
        type: String,
        required: true,
        trim: true
    },
    address_2: {
        type: String,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    phone_number: {
        type: String,
        required: true,
        trim: true
    },
    clients: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Client' }
    ],
});
const Agency = mongoose.model('Agency', agencySchema);
module.exports = Agency;
