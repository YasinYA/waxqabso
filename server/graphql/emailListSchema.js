const graphql = require("graphql");
const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLObjectType
} = graphql;

const EmailListModel = require("../models/emailList.js");
const { EmailListType, EmailListInputType } = require("./types.js");

// => Queries
const queryFields = {
    emailList: {
        type: EmailListType,
        args: {
            id: { type: GraphQLID }
        },
        resolve(parent, args) {
            return EmailListModel.findById({
                _id: args.id
            })
                .then(result => result)
                .catch(err => console.log("Error: " + err));
        }
    },
    emailListByName: {
        type: EmailListType,
        args: {
            name: { type: GraphQLString }
        },
        resolve(parent, args) {
            return EmailListModel.findOne({
                name: args.name
            })
                .then(result => result)
                .catch(err => console.log("Error: " + err));
        }
    },
    emailLists: {
        type: new GraphQLList(EmailListType),
        resolve(parent, args) {
            return EmailListModel.find({})
                .then(result => result)
                .catch(err => console.log("Error: " + err));
        }
    }
};

// => Mutations
const mutationFields = {
    addEmailList: {
        type: EmailListType,
        args: {
            input: {
                type: new GraphQLNonNull(EmailListInputType)
            }
        },
        resolve(parent, args) {
            return EmailListModel.create({
                name: args.input.name,
                description: args.input.description
            })
                .then(result => result)
                .catch(err => console.log("Error: " + err));
        }
    },
    deleteEmailList: {
        type: EmailListType,
        args: {
            id: {
                type: GraphQLID
            }
        },
        resolve(parent, args) {
            return EmailListModel.findByIdAndDelete({
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
