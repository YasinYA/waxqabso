import gql from 'graphql-tag';

const addMember = gql`
    mutation addMember($name: String!, $email: String!, $emailListId: ID!) {
        addMember(
            input: { name: $name, email: $email, emailListId: $emailListId }
        ) {
            id
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
