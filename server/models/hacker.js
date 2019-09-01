const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hackerSchema = new Schema({
    name: String,
    phone: String,
    email: String,
    job_title: String,
    company: {
        type: String,
        unique: true
    },
    hackathons: {
        type: Schema.Types.ObjectId,
        ref: "Hackathon"
    },
    skills: {
        type: Schema.Types.ObjectId,
        ref: "Skill"
    },
    subscribed: {
        type: Boolean,
        default: true
    },
    token: {
        type: String
    }
});

const Hacker = mongoose.model("Hacker", hackerSchema);

module.exports = Hacker;
