const graphql = require("graphql");
const { GraphQLList, GraphQLNonNull } = graphql;

const AttendeeModel = require("../models/attendee.js");
const { AttendeeType, AttendeeInputType, ResultType } = require("./types.js");

// => Queries
const queryFields = {
    attendees: {
        type: new GraphQLList(AttendeeType),
        resolve(parent, args) {
            return AttendeeModel.find({})
                .then(attendees => attendees)
                .catch(err => console.log("Error: " + err));
        }
    }
};

// => Mutations
const mutationFields = {
    addAttendee: {
        type: ResultType,
        args: {
            input: {
                type: new GraphQLNonNull(AttendeeInputType)
            }
        },
        resolve(parent, args) {
            return AttendeeModel.create({ ...args.input })
                .then(attendee => {
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
    }
};

module.exports = {
    queryFields,
    mutationFields
};
