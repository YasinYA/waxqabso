import gql from 'graphql-tag';

const addMessage = gql`
    mutation addMessage($name: String!, $email: String!, $message: String!) {
        addMessage(input: { name: $name, email: $email, message: $message }) {
            id
        }
    }
`;

export { addMessage };
