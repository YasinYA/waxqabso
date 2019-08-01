const Sequelize = require("sequelize");
const db = require("./index.js");

const EmailList = db.define("email_list", {
    name: {
        type: Sequelize.STRING,
        unique: true
    },
    description: {
        type: Sequelize.TEXT
    }
});

module.exports = EmailList;
