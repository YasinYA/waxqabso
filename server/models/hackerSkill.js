const Sequelize = require("sequelize");
const db = require("./index.js");
const SkillModel = require("./skill.js");
const HackerModel = require("./hacker.js");

// Join tables for Hacker and Skill
const HackerSkill = db.define("hackerSkill", {});

// Create the relationship
HackerSkill.belongsTo(SkillModel);
HackerSkill.belongsTo(HackerModel);
SkillModel.hasMany(HackerSkill);
HackerModel.hasMany(HackerSkill);

module.exports = HackerSkill;
