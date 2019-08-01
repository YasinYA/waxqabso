import gql from 'graphql-tag';

const addHackerSkill = gql`
    mutation addHackerSkill($hackerId: ID!, $skillId: ID!) {
        addHackerSkill(input: { hackerId: $hackerId, skillId: $skillId }) {
            id
        }
    }
`;

export { addHackerSkill };
