const graphql = require("graphql");
const mongoose = require("mongoose");
const {
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInputObjectType
} = graphql;

// => Models
const HackerModel = require("../models/hacker.js");
const HackathonModel = require("../models/hackathon.js");
const SkillModel = require("../models/skill.js");
const EmailListModel = require("../models/emailList.js");
const MemberModel = require("../models/member.js");

// => Hacker
const HackerType = new GraphQLObjectType({
    name: "Hacker",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        email: { type: GraphQLString },
        job_title: { type: GraphQLString },
        company: { type: GraphQLString },
        hackathons: {
            type: new GraphQLList(HackathonType),
            resolve(parent, args) {
                return HackerModel.findById({
                    _id: parent.id
                })
                    .populate("hackathons")
                    .then(hacker =>
                        hacker.hackathons.map(hackathon => hackathon)
                    );
            }
        },
        skills: {
            type: new GraphQLList(SkillType),
            resolve(parent, args) {
                return HackerSkillModel.findById({
                    _id: parent.id
                })
                    .populate("skills")
                    .then(hacker => hacker.skills.map(skill => skill));
            }
        },
        emailList: {
            type: EmailListType,
            resolve(parent, args) {
                return HackerModel.findById({
                    _id: parent.id
                })
                    .populate("email_list")
                    .then(hacker => hacker.email_list)
                    .catch(err => console.log("Error: " + err));
            }
        }
    })
});

const HackerInputType = new GraphQLInputObjectType({
    name: "HackerInputType",
    fields: {
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        email: { type: GraphQLString },
        job_title: { type: GraphQLString },
        company: { type: GraphQLString },
        email_list: { type: GraphQLID }
    }
});

// => Hackathon
const HackathonType = new GraphQLObjectType({
    name: "Hackathon",
    fields: () => ({
        id: { type: GraphQLID },
        start_time: { type: GraphQLString },
        end_time: { type: GraphQLString },
        start_date: { type: GraphQLString },
        end_date: { type: GraphQLString },
        project: { type: GraphQLString },
        description: { type: GraphQLString },
        finished: { type: GraphQLBoolean },
        hackers: {
            type: new GraphQLList(HackerType),
            resolve(parent, args) {
                return HackernModel.find({
                    hackathons: mongoose.Types.ObjectId(parent.id)
                }).then(hackers => hackers.map(hacker => hacker));
            }
        }
    })
});

const HackathonInputType = new GraphQLInputObjectType({
    name: "HackathonInputType",
    fields: {
        start_time: { type: GraphQLString },
        end_time: { type: GraphQLString },
        start_date: { type: GraphQLString },
        end_date: { type: GraphQLString },
        project: { type: GraphQLString },
        description: { type: GraphQLString },
        finished: { type: GraphQLBoolean }
    }
});

// => Member
const MemberType = new GraphQLObjectType({
    name: "Member",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        emailList: {
            type: EmailListType,
            resolve(parent, args) {
                return MemberModel.findById({
                    _id: parent.id
                })
                    .then(member => member.email_list)
                    .catch(err => console.log("Error: " + err));
            }
        }
    })
});

const MemberInputType = new GraphQLInputObjectType({
    name: "MemberInputType",
    fields: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        email_list: { type: GraphQLID }
    }
});

// => EmailList
const EmailListType = new GraphQLObjectType({
    name: "EmailList",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        hackers: {
            type: new GraphQLList(HackerType),
            resolve(parent, args) {
                return HackerModel.find({
                    email_list: mongoose.Types.ObjectId(parent.id)
                })
                    .then(hackers => hackers)
                    .catch(err => console.log("Error: " + err));
            }
        },
        members: {
            type: new GraphQLList(HackerType),
            resolve(parent, args) {
                return MemberModel.find({
                    email_list: mongoose.Types.ObjectId(parent.id)
                })
                    .then(members => members)
                    .catch(err => console.log("Error: " + err));
            }
        }
    })
});

const EmailListInputType = new GraphQLInputObjectType({
    name: "EmailListInputType",
    fields: {
        name: { type: GraphQLString },
        description: { type: GraphQLString }
    }
});

// => Skill
const SkillType = new GraphQLObjectType({
    name: "Skill",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        level: { type: GraphQLInt }
    })
});

const SkillInputType = new GraphQLInputObjectType({
    name: "SkillInputType",
    fields: {
        name: { type: GraphQLString },
        level: { type: GraphQLInt }
    }
});

// => Message
const MessageType = new GraphQLObjectType({
    name: "Message",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        message: { type: GraphQLString }
    })
});

const MessageInputType = new GraphQLInputObjectType({
    name: "MessageInputType",
    fields: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        message: { type: GraphQLString }
    }
});

// Result Type
const ResultType = new GraphQLObjectType({
    name: "ResultType",
    fields: {
        success: {
            type: GraphQLBoolean
        },
        message: {
            type: GraphQLString
        }
    }
});

module.exports = {
    HackerType,
    HackerInputType,
    HackathonType,
    HackathonInputType,
    SkillType,
    SkillInputType,
    EmailListType,
    EmailListInputType,
    MemberType,
    MemberInputType,
    MessageType,
    MessageInputType,
    ResultType
};
