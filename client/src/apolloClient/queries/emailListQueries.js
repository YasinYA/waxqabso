import gql from 'graphql-tag';

const emailListByName = gql`
    query($name: String!) {
        emailListByName(name: $name) {
            id
        }
    }
`;

export { emailListByName };
