import { gql } from '@apollo/client';

const CREATE_DOCUMENT_TYPE = gql`
  mutation Mutation($data: TypeDocumentCreateInput!) {
    createTypeDocument(data: $data) {
      id
    }
  }
`;

export { CREATE_DOCUMENT_TYPE };
