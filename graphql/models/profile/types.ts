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

  input ProfileUpdateInput {
    customName: StringEditField
    customImage: StringEditField
    location: StringEditField
    phone: StringEditField
    identification: StringEditField
  }

  type Query {
    getProfiles: [Profile]
    getProfile(where: ProfileFilterId!): Profile
  }

  type Mutation {
    createProfile(data: ProfileCreateInput!): Profile
    upsertProfile(
      where: ProfileFilterId!
      create: ProfileCreateInput
      update: ProfileUpdateInput
    ): Profile
  }
`;

export { ProfileTypes };
