import { gql } from '@apollo/client';

const GET_USERS = gql`
  query Query {
    getUsers {
      id
      email
      name
      image
      role {
        id
        name
      }
    }
  }
`;

export { GET_USERS };
