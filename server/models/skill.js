const Sequelize = require("sequelize");
const db = require("./index.js");

const Skill = db.define("skill", {
    name: {
        type: Sequelize.STRING
    },
    level: {
        type: Sequelize.INTEGER
    }
});

module.exports = Skill;
