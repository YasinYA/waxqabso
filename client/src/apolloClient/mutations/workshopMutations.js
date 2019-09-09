import gql from 'graphql-tag';

const addWorkshopMember = gql`
    mutation AddWorkshopMember(
        $name: String!
        $phone: String!
        $email: String!
        $job_title: String!
        $company: String!
        $hackathon_id: ID!
    ) {
        addWorkshopMember(
            input: {
                name: $name
                phone: $phone
                email: $email
                job_title: $job_title
                company: $company
                hackathon_id: $hackathon_id
            }
        ) {
            success
            message
        }
    }
`;


export { addWorkshopMember };
