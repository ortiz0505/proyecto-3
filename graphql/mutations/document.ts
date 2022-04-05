import { gql } from '@apollo/client';

const CREATE_DOCUMENT = gql`
  mutation Mutation($data: DocumentCreateInput!) {
    createDocument(data: $data) {
      id
    }
  }
`;

export { CREATE_DOCUMENT };
