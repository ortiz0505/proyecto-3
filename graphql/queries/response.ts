import { gql } from '@apollo/client';

const GET_RESPONSED_DOCUMENT = gql`
  query Query {
    getResponses {
      id
      response
      comment {
        id
        comment
        document {
          id
          name
          status
          typeDocument {
            id
            name
            format
          }
        }
      }
    }
  }
`;

export { GET_RESPONSED_DOCUMENT };
