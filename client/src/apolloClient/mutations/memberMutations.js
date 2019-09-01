import gql from 'graphql-tag';

const addMember = gql`
    mutation addMember($name: String!, $email: String!) {
        addMember(input: { name: $name, email: $email }) {
            success
            message
        }
    }
`;

const unSubMember = gql`
    mutation unSubMember($token: String) {
        unSubMember(token: $token) {
            success
            message
        }
    }
`;

export { addMember, unSubMember };
