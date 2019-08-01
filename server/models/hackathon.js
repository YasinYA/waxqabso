const Sequelize = require("sequelize");
const db = require("./index.js");

const Hackathon = db.define("hackathon", {
    start_date: {
        type: Sequelize.STRING
    },
    end_date: {
        type: Sequelize.STRING
    },
    start_time: {
        type: Sequelize.STRING
    },
    end_time: {
        type: Sequelize.STRING
    },
    project: {
        type: Sequelize.STRING,
        unique: true
    },
    description: {
        type: Sequelize.TEXT
    }
});

module.exports = Hackathon;
