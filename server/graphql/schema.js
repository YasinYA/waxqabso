const graphql = require("graphql");
const { GraphQLObjectType, GraphQLSchema } = graphql;

// => Schemas
const hackathonSchema = require("./hackathonSchema.js");
const hackerSchema = require("./hackerSchema.js");
const memberSchema = require("./memberSchema.js");
const messageSchema = require("./messageSchema.js");
const attendeeSchema = require("./attendeeSchema.js");

// => Queries and Mutations
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        ...hackathonSchema.queryFields,
        ...hackerSchema.queryFields,
        ...memberSchema.queryFields,
        ...messageSchema.queryFields,
        ...attendeeSchema.queryFields
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        ...hackathonSchema.mutationFields,
        ...hackerSchema.mutationFields,
        ...memberSchema.mutationFields,
        ...messageSchema.mutationFields,
        ...attendeeSchema.mutationFields
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
