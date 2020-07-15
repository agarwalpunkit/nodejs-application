const mongoose = require("mongoose");
const clientSchema = new mongoose.Schema({
    agency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section'
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone_number: {
        type: String,
        required: true,
        trim: true
    },
    total_bill: {
        type: Number,
        required: true,
        trim: true
    },
});
const Client = mongoose.model('Client', clientSchema);
module.exports = Client;
