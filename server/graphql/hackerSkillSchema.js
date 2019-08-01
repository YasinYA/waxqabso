const graphql = require("graphql");
const {
    GraphQLID,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLObjectType
} = graphql;

const HackerSkillModel = require("../models/hackerSkill.js");
const { HackerSkillType, HackerSkillInputType } = require("./types.js");

// => Queries
const queryFields = {};

// => Mutations
const mutationFields = {
    addHackerSkill: {
        type: HackerSkillType,
        args: {
            input: {
                type: new GraphQLNonNull(HackerSkillInputType)
            }
        },
        resolve(parent, args) {
            return HackerSkillModel.create({
                hackerId: args.input.hackerId,
                skillId: args.input.skillId
            })
                .then(result => result)
                .catch(err => console.log("Error: " + err));
        }
    },
    deleteHackerSkill: {
        type: HackerSkillType,
        args: {
            input: {
                type: new GraphQLNonNull(HackerSkillInputType)
            }
        },
        resolve(parent, args) {
            return HackerSkillModel.destroy({
                where: {
                    id: args.input.id
                }
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
