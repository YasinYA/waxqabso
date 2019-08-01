const Sequelize = require("sequelize");
const db = require("./index.js");
const EmailListModel = require("./emailList.js");

const Member = db.define("member", {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    token: {
        type: Sequelize.TEXT
    }
});

// Relationships 1:M
Member.belongsTo(EmailListModel);
EmailListModel.hasMany(Member);

module.exports = Member;
