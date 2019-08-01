import gql from 'graphql-tag';

const hackathons = gql`
    {
        hackathons {
            id
            start_date
            start_time
            end_date
            end_time
            project
            description
        }
    }
`;

const hackathon = gql`
    query($id: ID) {
        hackathon(id: $id) {
            id
            start_date
            start_time
            end_date
            end_time
            project
            description
        }
    }
`;

export { hackathons, hackathon };
