const Sequelize = require("sequelize");
const db = require("./index.js");

const Message = db.define("message", {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    message: {
        type: Sequelize.TEXT
    }
});

module.exports = Message;
