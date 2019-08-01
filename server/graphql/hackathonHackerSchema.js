const graphql = require("graphql");
const {
    GraphQLID,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLObjectType
} = graphql;

const HackathonHackerModel = require("../models/hackathonHacker.js");
const { HackathonHackerType, HackathonHackerInputType } = require("./types.js");

// => Mutations
const mutationFields = {
    addHackathonHacker: {
        type: HackathonHackerType,
        args: {
            input: {
                type: new GraphQLNonNull(HackathonHackerInputType)
            }
        },
        resolve(parent, args) {
            return HackathonHackerModel.create({
                hackathonId: args.input.hackathonId,
                hackerId: args.input.hackerId
            })
                .then(result => result)
                .catch(err => console.log("Error: " + err));
        }
    },
    deleteHackathonHacker: {
        type: HackathonHackerType,
        args: {
            input: {
                type: new GraphQLNonNull(HackathonHackerInputType)
            }
        },
        resolve(parent, args) {
            return HackathonHackerModel.destroy({
                where: {
                    hackathon_id: args.input.hackathon_id,
                    hacker_id: args.input.hacker_id
                }
            })
                .then(() => ({
                    success: true,
                    message: "Successfully Deleted"
                }))
                .catch(err => console.log("Error: " + err));
        }
    }
};

module.exports = {
    mutationFields
};
