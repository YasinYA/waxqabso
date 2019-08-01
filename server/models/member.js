const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EmailListModel = require("./emailList.js");

const memberSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    email_list: {
        type: Schema.Types.ObjectId,
        ref: "EmailList"
    },
    token: {
        type: String
    }
});

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
