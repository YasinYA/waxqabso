const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emailListSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    hackers: {
        type: Schema.Types.ObjectId,
        ref: "Hacker"
    },
    members: {
        type: Schema.Types.ObjectId,
        ref: "Member"
    },
    description: String
});

const EmailList = mongoose.model("EmailList", emailListSchema);

module.exports = EmailList;
