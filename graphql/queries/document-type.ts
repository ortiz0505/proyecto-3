import { gql } from '@apollo/client';

const GET_DOCUMENT_TYPE = gql`
  query Query {
    getTypeDocuments {
      id
      name
      format
      template
    }
  }
`;

export { GET_DOCUMENT_TYPE };
