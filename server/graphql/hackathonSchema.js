const graphql = require("graphql");
const {
    GraphQLID,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLObjectType
} = graphql;

const HackathonModel = require("../models/hackathon.js");
const { HackathonType, HackathonInputType } = require("./types.js");

// => Queries
const queryFields = {
    hackathon: {
        type: HackathonType,
        args: {
            id: { type: GraphQLID }
        },
        resolve(parent, args) {
            return HackathonModel.findById({
                _id: args.id
            })
                .then(result => result)
                .catch(err => console.log("Error: " + err));
        }
    },
    hackathons: {
        type: new GraphQLList(HackathonType),
        args: {
            finished: { type: GraphQLBoolean }
        },
        resolve(parent, args) {
            return HackathonModel.find({ finished: args.finished })
                .then(result => result)
                .catch(err => console.log("Error: " + err));
        }
    }
};

// => Mutations
const mutationFields = {
    addHackathon: {
        type: HackathonType,
        args: {
            input: {
                type: new GraphQLNonNull(HackathonInputType)
            }
        },
        resolve(parent, args) {
            return HackathonModel.create({
                start_time: args.input.start_time,
                start_date: args.input.start_date,
                end_time: args.input.end_time,
                end_date: args.input.end_date,
                project: args.input.project,
                description: args.input.description,
                finished: args.input.finished
            })
                .then(result => result)
                .catch(err => console.log("Error: " + err));
        }
    },
    updateHackathon: {
        type: HackathonType,
        args: {
            id: {
                type: GraphQLID
            },
            input: {
                type: new GraphQLNonNull(HackathonInputType)
            }
        },
        resolve(parent, args) {
            return HackathonModel.findByIdAndUpdate(
                { _id: args.id },
                {
                    ...args.input
                }
            ).then(hackathon => {
                return hackathon;
            });
        }
    },
    deleteHackathon: {
        type: HackathonType,
        args: {
            id: {
                type: GraphQLID
            }
        },
        resolve(parent, args) {
            return HackathonModel.findByIdAndDelete({
                _id: args.id
            })
                .then(result => ({
                    success: true,
                    message: "Successfully Deleted"
                }))
                .catch(err => console.log("Error: " + err));
        }
    }
};

module.exports = {
    queryFields,
    mutationFields
};
