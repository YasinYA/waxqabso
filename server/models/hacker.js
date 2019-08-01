const Sequelize = require("sequelize");
const db = require("./index.js");
const EmailListModel = require("./emailList.js");

const Hacker = db.define("hacker", {
    name: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    job_title: {
        type: Sequelize.STRING
    },
    company: {
        type: Sequelize.STRING,
        unique: true
    },
    token: {
        type: Sequelize.TEXT
    }
});

// Relationships 1:M
Hacker.belongsTo(EmailListModel);
EmailListModel.hasMany(Hacker);

module.exports = Hacker;
