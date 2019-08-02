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
        type: HackerType,
        args: {
            input: {
                type: new GraphQLNonNull(HackerInputType)
            }
        },
        resolve(parent, args) {
            let hacker = args.input;
            hacker.email_list = hacker.email_list;
            try {
                hacker.token = jwt.sign(
                    {
                        hackerEmail: hacker.email,
                        email_list: hacker.email_list
                    },
                    secret
                );
            } catch (err) {
                throw Error(err);
            }

            return new HackerModel({ ...hacker })
                .then(hacker => {
                    // send the email
                    sendEmail("welcome", {
                        name: hacker.name,
                        email: hacker.email,
                        token: hacker.token,
                        urlPath: "unsubhacker"
                    });

                    return hacker;
                })
                .catch(err => console.log("Error: " + err));
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
                    if (!hacker.email_list)
                        return {
                            success: false,
                            message: "You are already un-subscribed."
                        };
                    else {
                        HackerModel.findByIdAndUpdate(
                            { _id: hacker.id },
                            { token: "", email_list: null }
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
    },
    subHacker: {
        type: HackerType,
        args: {
            id: {
                type: GraphQLID
            },
            email_listId: {
                type: GraphQLID
            }
        },
        resolve(parent, args) {
            return HackerModel.findByIdAndUpdate(
                {
                    _id: args.id
                },
                { email_list: args.email_listId }
            )
                .then(hacker => hacker)
                .catch(err => console.log("Error: " + err));
        }
    }
};

module.exports = {
    queryFields,
    mutationFields
};
