const graphql = require("graphql");
const {
    GraphQLID,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLObjectType
} = graphql;
const sendEmail = require("../utils/email.js");
const jwt = require("jsonwebtoken");
const { secret } = require("../cred.js");

const MessageModel = require("../models/message.js");
const { MessageType, MessageInputType, ResultType } = require("./types.js");

// => Queries
const queryFields = {
    message: {
        type: MessageType,
        args: {
            id: { type: GraphQLID }
        },
        resolve(parent, args) {
            return MessageModel.findById({
                _id: args.id
            })
                .then(result => result)
                .catch(err => console.log("Error: " + err));
        }
    },
    messages: {
        type: new GraphQLList(MessageType),
        resolve(parent, args) {
            return MessageModel.find({})
                .then(result => result)
                .catch(err => console.log("Error: " + err));
        }
    }
};

// => Mutations
const mutationFields = {
    addMessage: {
        type: MessageType,
        args: {
            input: {
                type: new GraphQLNonNull(MessageInputType)
            }
        },
        resolve(parent, args) {
            return MessageModel.create({ ...args.input })
                .then(member => member)
                .catch(err => console.log("Error: " + err));
        }
    },
    deleteMessage: {
        type: ResultType,
        args: {
            id: {
                type: GraphQLID
            }
        },
        resolve(parent, args) {
            return MessageModel.findByIdAndDelete({
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
