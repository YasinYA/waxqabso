import gql from 'graphql-tag';

const addHacker = gql`
    mutation AddHacker(
        $name: String!
        $phone: String!
        $email: String!
        $job_title: String!
        $company: String!
    ) {
        addHacker(
            input: {
                name: $name
                phone: $phone
                email: $email
                job_title: $job_title
                company: $company
            }
        ) {
            id
            name
        }
    }
`;

const unSubHacker = gql`
    mutation unSubHacker($token: String) {
        unSubHacker(token: $token) {
            success
            message
        }
    }
`;

export { addHacker, unSubHacker };
