import { gql } from '@apollo/client';

const CREATE_RESPONSE = gql`
  mutation Mutation($data: ResponseCreateInput!) {
    createResponse(data: $data) {
      id
    }
  }
`;

export { CREATE_RESPONSE };
