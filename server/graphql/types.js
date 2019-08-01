const graphql = require("graphql");
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
const HackathonHackerModel = require("../models/hackathonHacker.js");
const SkillModel = require("../models/skill.js");
const HackerSkillModel = require("../models/hackerSkill.js");
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
                return HackathonHackerModel.findAll({
                    where: {
                        hackerId: parent.id
                    },
                    include: [HackathonModel]
                }).then(result =>
                    result.map(hackathonhacker => hackathonhacker.hackathon)
                );
            }
        },
        skills: {
            type: new GraphQLList(SkillType),
            resolve(parent, args) {
                return HackerSkillModel.findAll({
                    where: {
                        hackerId: parent.id
                    },
                    include: [SkillModel]
                }).then(result => result.map(hackerSkill => hackerSkill.skill));
            }
        },
        emailList: {
            type: EmailListType,
            resolve(parent, args) {
                return HackerModel.findOne({
                    where: {
                        id: parent.id
                    }
                })
                    .then(result => result.getEmail_list())
                    .then(emaillist => emaillist)
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
        emailListId: { type: GraphQLID }
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
        hackers: {
            type: new GraphQLList(HackerType),
            resolve(parent, args) {
                return HackathonHackerModel.findAll({
                    where: {
                        hackathonId: parent.id
                    },
                    include: [HackerModel]
                }).then(result =>
                    result.map(hackathonhacker => hackathonhacker.hacker)
                );
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
        description: { type: GraphQLString }
    }
});

// => Hackathon Hacker
const HackathonHackerType = new GraphQLObjectType({
    name: "HackathonHacker",
    fields: () => ({
        id: { type: GraphQLID },
        hackathonId: { type: HackathonType },
        hackerId: { type: HackerType }
    })
});

const HackathonHackerInputType = new GraphQLInputObjectType({
    name: "HackathonHackerInputType",
    fields: {
        hackathonId: { type: GraphQLID },
        hackerId: { type: GraphQLID }
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
                return MemberModel.findOne({
                    where: {
                        id: parent.id
                    }
                })
                    .then(member => member.getEmail_list())
                    .then(emaillist => emaillist)
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
        emailListId: { type: GraphQLID }
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
                return EmailListModel.findOne({
                    where: {
                        id: parent.id
                    }
                })
                    .then(emailList => emailList.getHackers())
                    .then(hackers => hackers)
                    .catch(err => console.log("Error: " + err));
            }
        },
        members: {
            type: new GraphQLList(HackerType),
            resolve(parent, args) {
                return EmailListModel.findOne({
                    where: {
                        id: parent.id
                    }
                })
                    .then(emailList => emailList.getMembers())
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

// => Hacker Skill
const HackerSkillType = new GraphQLObjectType({
    name: "HackerSkill",
    fields: () => ({
        id: { type: GraphQLID },
        hackerId: { type: HackerType },
        skillId: { type: SkillType }
    })
});

const HackerSkillInputType = new GraphQLInputObjectType({
    name: "HackerSkillInputType",
    fields: {
        hackerId: { type: GraphQLID },
        skillId: { type: GraphQLID }
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
    HackathonHackerType,
    HackathonHackerInputType,
    HackerSkillType,
    HackerSkillInputType,
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
