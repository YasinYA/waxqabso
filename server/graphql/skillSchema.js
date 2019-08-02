const graphql = require("graphql");
const {
    GraphQLID,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLObjectType
} = graphql;

const SkillModel = require("../models/skill.js");
const { SkillType, SkillInputType } = require("./types.js");

// => Queries
const queryFields = {
    skills: {
        type: new GraphQLList(SkillType),
        resolve(parent, args) {
            return SkillModel.find({})
                .then(result => result)
                .catch(err => console.log("Error: " + err));
        }
    }
};

// => Mutations
const mutationFields = {
    addSkill: {
        type: SkillType,
        args: {
            input: {
                type: new GraphQLNonNull(SkillInputType)
            }
        },
        resolve(parent, args) {
            return new SkillModel({
                name: args.input.name,
                level: args.input.level
            })
                .then(result => result)
                .catch(err => console.log("Error: " + err));
        }
    },
    deleteSkill: {
        type: SkillType,
        args: {
            input: {
                type: new GraphQLNonNull(SkillInputType)
            }
        },
        resolve(parent, args) {
            return SkillModel.findByIdAndDelete({
                _id: args.input.id
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
