import gql from 'graphql-tag';

const addMember = gql`
    mutation addMember($name: String!, $email: String!, $email_list: ID!) {
        addMember(
            input: { name: $name, email: $email, email_list: $email_list }
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
