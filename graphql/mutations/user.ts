import { gql } from '@apollo/client';

const UPDATE_USER = gql`
  mutation UpdateUser($data: UserUpdateInput!, $where: UserFilterId!) {
    updateUser(data: $data, where: $where) {
      id
    }
  }
`;

export { UPDATE_USER };
