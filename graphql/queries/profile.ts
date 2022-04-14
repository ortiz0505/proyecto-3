import { gql } from '@apollo/client';

const GET_PROFILES = gql`
  query GetProfiles {
    getProfiles {
      id
      customName
      customImage
      location
      phone
      identification
    }
  }
`;

export { GET_PROFILES };
