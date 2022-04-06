import { gql } from '@apollo/client';

const GET_PENDING_DOCUMENT = gql`
  query GetPendingDocument {
    getPendingDocument {
      id
      name
      url
      createdAt
      createdBy {
        id
        name
      }
      typeDocument {
        id
        name
        template
      }
    }
  }
`;
export { GET_PENDING_DOCUMENT };
