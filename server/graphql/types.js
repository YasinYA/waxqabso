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
        subscribed: {
            type: GraphQLBoolean
        },
        hackathons: {
            type: new GraphQLList(HackathonType),
            resolve(parent, args) {
                return HackerModel.findById({
                    _id: parent.id
                })
                    .populate("hackathons")
                    .then(hacker => hacker.hackathons);
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
        hackathon_id: { type: GraphQLID }
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
        subscribed: { type: GraphQLBoolean }
    })
});

const MemberInputType = new GraphQLInputObjectType({
    name: "MemberInputType",
    fields: {
        name: { type: GraphQLString },
        email: { type: GraphQLString }
    }
});

// => HackerMail
const HackerMail = new GraphQLObjectType({
    name: "HackerMail",
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
        }
    })
});

const HackerMailInputType = new GraphQLInputObjectType({
    name: "HackerMailInputType",
    fields: {
        name: { type: GraphQLString },
        description: { type: GraphQLString }
    }
});

// => MemberMail
const MemberMail = new GraphQLObjectType({
    name: "MemberMail",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
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

const MemberMailInputType = new GraphQLInputObjectType({
    name: "MemberMailInputType",
    fields: {
        name: { type: GraphQLString },
        description: { type: GraphQLString }
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
    MemberType,
    MemberInputType,
    MessageType,
    MessageInputType,
    ResultType
};
