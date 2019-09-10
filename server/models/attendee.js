const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attendeeSchema = new Schema({
    name: String,
    phone: String,
    email: String,
    occupation: String
});

const Attendee = mongoose.model("Attendee", attendeeSchema);

module.exports = Attendee;
