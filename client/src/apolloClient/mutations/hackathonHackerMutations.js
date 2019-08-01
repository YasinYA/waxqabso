import gql from 'graphql-tag';

const addHackathonHacker = gql`
    mutation addHackathonHacker($hackathonId: ID!, $hackerId: ID!) {
        addHackathonHacker(
            input: { hackathonId: $hackathonId, hackerId: $hackerId }
        ) {
            id
        }
    }
`;

export { addHackathonHacker };
