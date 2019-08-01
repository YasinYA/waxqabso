import gql from 'graphql-tag';

const skills = gql`
    {
        skills {
            id
            name
            level
        }
    }
`;

export { skills };
