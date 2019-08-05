import gql from 'graphql-tag';

const hackathons = gql`
    query($finished: Boolean) {
        hackathons(finished: $finished) {
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
