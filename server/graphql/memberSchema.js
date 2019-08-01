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

const MemberModel = require("../models/member.js");
const { MemberType, MemberInputType, ResultType } = require("./types.js");

// => Queries
const queryFields = {
    member: {
        type: MemberType,
        args: {
            id: { type: GraphQLID }
        },
        resolve(parent, args) {
            return MemberModel.findOne({
                where: {
                    id: args.id
                }
            })
                .then(result => result)
                .catch(err => console.log("Error: " + err));
        }
    },
    members: {
        type: new GraphQLList(MemberType),
        resolve(parent, args) {
            return MemberModel.findAll()
                .then(result => result)
                .catch(err => console.log("Error: " + err));
        }
    }
};

// => Mutations
const mutationFields = {
    addMember: {
        type: MemberType,
        args: {
            input: {
                type: new GraphQLNonNull(MemberInputType)
            }
        },
        resolve(parent, args) {
            let member = args.input;
            try {
                member.token = jwt.sign(
                    {
                        memberEmail: member.email,
                        emailListId: member.emailListId
                    },
                    secret
                );
            } catch (err) {
                throw Error(err);
            }

            return MemberModel.create({ ...member })
                .then(member => {
                    // send the email
                    sendEmail("welcomeMember", {
                        name: member.name,
                        email: member.email,
                        token: member.token,
                        urlPath: "unsubmember"
                    });
                    return member;
                })
                .catch(err => console.log("Error: " + err));
        }
    },
    deleteMember: {
        type: ResultType,
        args: {
            id: {
                type: GraphQLID
            }
        },
        resolve(parent, args) {
            return MemberModel.destroy({
                where: {
                    id: args.id
                }
            })
                .then(result => ({
                    success: true,
                    message: "Successfully Deleted"
                }))
                .catch(err => console.log("Error: " + err));
        }
    },
    unSubMember: {
        type: ResultType,
        args: {
            token: {
                type: GraphQLString
            }
        },
        resolve(parent, args) {
            // verify the token
            const { memberEmail } = jwt.verify(
                args.token,
                secret,
                (err, data) => data
            );
            return MemberModel.findOne({
                where: {
                    email: memberEmail
                }
            })
                .then(member => {
                    if (!member.emailListId)
                        return {
                            success: false,
                            message: "You are already un-subscribed."
                        };
                    else {
                        member.setEmail_list(null);
                        member
                            .update({
                                token: ""
                            })
                            .then(updatedMember => {
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
    subMember: {
        type: MemberType,
        args: {
            id: {
                type: GraphQLID
            },
            emaillistId: {
                type: GraphQLID
            }
        },
        resolve(parent, args) {
            return MemberModel.findOne({
                where: {
                    id: args.id
                }
            })
                .then(member => member.setEmail_list(args.emaillistId))
                .catch(err => console.log("Error: " + err));
        }
    }
};

module.exports = {
    queryFields,
    mutationFields
};
