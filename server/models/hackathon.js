const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hackathonSchema = new Schema({
    start_date: String,
    end_date: String,
    start_time: String,
    end_time: String,
    project: {
        type: String,
        unique: true
    },
    hackers: {
        type: Schema.Types.ObjectId,
        ref: "Hacker"
    },
    description: {
        type: String
    },
    finished: Boolean
});

const Hackathon = mongoose.model("Hackathon", hackathonSchema);

module.exports = Hackathon;
