const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EmailListModel = require("./emailList.js");

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
    email_list: {
        type: Schema.Types.ObjectId,
        ref: "EmailList"
    },
    skills: {
        type: Schema.Types.ObjectId,
        ref: "Skill"
    },
    token: {
        type: String
    }
});

const Hacker = mongoose.model("Hacker", hackerSchema);

module.exports = Hacker;
