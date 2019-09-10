import gql from 'graphql-tag';

const addAttendee = gql`
    mutation AddAttendee(
        $name: String!
        $phone: String!
        $email: String!
        $occupation: String!
    ) {
        addAttendee(
            input: {
                name: $name
                phone: $phone
                email: $email
                occupation: $occupation
            }
        ) {
            success
            message
        }
    }
`;

export { addAttendee };
