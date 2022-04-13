import { gql } from '@apollo/client';

const CREATE_DOCUMENT = gql`
  mutation Mutation($data: DocumentCreateInput!) {
    createDocument(data: $data) {
      id
    }
  }
`;

const UPDATE_DOCUMENT = gql`
  mutation Mutation($where: DocumentFilterId, $data: DocumentUpdateInput) {
    updateDocument(where: $where, data: $data) {
      id
    }
  }
`;

export { CREATE_DOCUMENT, UPDATE_DOCUMENT };
