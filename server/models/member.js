const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    subscribed: {
        type: Boolean,
        default: true
    },
    token: {
        type: String
    }
});

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
