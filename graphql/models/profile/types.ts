import { gql } from 'apollo-server-micro';

const ProfileTypes = gql`
  type Profile {
    id: ID
    customName: String
    customImage: String
    location: String
    phone: String
    identification: String
    user: User
    userId: String
    createdAt: Date
    updatedAt: Date
  }

  input ProfileFilterId {
    id: String!
  }

  input ProfileCreateInput {
    customName: String
    customImage: String
    location: String
    phone: String
    identification: String
    userId: String
  }

  type Query {
    getProfiles: [Profile]
    getProfile(where: ProfileFilterId!): Profile
  }

  type Mutation {
    createProfile(data: ProfileCreateInput!): Profile
  }
`;

export { ProfileTypes };
