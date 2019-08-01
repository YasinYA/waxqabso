const Sequelize = require("sequelize");
const db = require("./index.js");
const HackathonModel = require("./hackathon.js");
const HackerModel = require("./hacker.js");

// Join tables for Hackathons and Hackers
const HackathonHacker = db.define("hackathonHacker", {});

// Create the relationship
HackathonHacker.belongsTo(HackathonModel);
HackathonHacker.belongsTo(HackerModel);
HackathonModel.hasMany(HackathonHacker);
HackerModel.hasMany(HackathonHacker);

module.exports = HackathonHacker;
