import gql from 'graphql-tag';

const addSkill = gql`
    mutation addSkill($name: StringD!, $level: String!) {
        addSkill(input: { name: $name, level: $level }) {
            id
        }
    }
`;

export { addSkill };
