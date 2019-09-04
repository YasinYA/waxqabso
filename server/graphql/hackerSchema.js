const graphql = require("graphql");
const {
    GraphQLID,
    GraphQLList,
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLObjectType
} = graphql;
const sendEmail = require("../utils/email.js");
const jwt = require("jsonwebtoken");
const { secret } = require("../cred.js");

const HackerModel = require("../models/hacker.js");
const { HackerType, HackerInputType, ResultType } = require("./types.js");

// => Queries
const queryFields = {
    hacker: {
        type: HackerType,
        args: {
            id: { type: GraphQLID }
        },
        resolve(parent, args) {
            return HackerModel.findById({
                _id: args.id
            })
                .then(result => result)
                .catch(err => console.log("Error: " + err));
        }
    },
    hackers: {
        type: new GraphQLList(HackerType),
        resolve(parent, args) {
            return HackerModel.find({})
                .then(result => result)
                .catch(err => console.log("Error: " + err));
        }
    }
};

// => Mutations
const mutationFields = {
    addHacker: {
        type: ResultType,
        args: {
            input: {
                type: new GraphQLNonNull(HackerInputType)
            }
        },
        resolve(parent, args) {
            let hacker = args.input;
            hacker.subscribed = true;
            hacker.hackathons = new Array(hacker.hackathon_id);
            try {
                hacker.token = jwt.sign(
                    {
                        hackerEmail: hacker.email
                    },
                    secret
                );
            } catch (err) {
                throw Error(err);
            }

            return HackerModel.create({ ...hacker })
                .then(hacker => {
                    // send the email
                    sendEmail("welcome", {
                        name: hacker.name,
                        email: hacker.email,
                        token: hacker.token,
                        urlPath: "unsubhacker"
                    });

                    return {
                        success: true,
                        message: "Successfully Registered"
                    };
                })
                .catch(err => ({
                    success: false,
                    message: "Something Went Wrong"
                }));
        }
    },
    deleteHacker: {
        type: ResultType,
        args: {
            id: {
                type: GraphQLID
            }
        },
        resolve(parent, args) {
            return HackerModel.findByIdAndDelete({
                _id: args.id
            })
                .then(result => ({
                    success: true,
                    message: "Successfully Deleted"
                }))
                .catch(err => console.log("Error: " + err));
        }
    },
    unSubHacker: {
        type: ResultType,
        args: {
            token: {
                type: GraphQLString
            }
        },
        resolve(parent, args) {
            // verify the token
            const { hackerEmail } = jwt.verify(
                args.token,
                secret,
                (err, data) => data
            );
            return HackerModel.findOne({
                email: hackerEmail
            })
                .then(hacker => {
                    if (!hacker.subscribed)
                        return {
                            success: false,
                            message: "You are already un-subscribed."
                        };
                    else {
                        HackerModel.findByIdAndUpdate(
                            { _id: hacker.id },
                            { token: "", subscribed: false }
                        ).then(updatedHacker => {
                            return {
                                success: true,
                                message: "Successfully Un-Subscribed."
                            };
                        });
                    }
                })
                .catch(err => console.log("Error: " + err));
        }
    }
};

module.exports = {
    queryFields,
    mutationFields
};
