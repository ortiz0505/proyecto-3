import { gql } from 'apollo-server-micro';

const UserTypes = gql`
  type User {
    id: ID
    email: String
    name: String
    image: String
    role: Role
    roleId: String
    comments: [Comment]
    documents: [Document]
    profile: Profile
    createdAt: Date
    updatedAt: Date
  }

  input UserFilterId {
    id: String!
  }

  input UserCreateInput {
    email: String
    name: String
    image: String
    roleId: String
  }

  input UserUpdateInput {
    email: StringEditField
    name: StringEditField
    image: StringEditField
    roleId: StringEditField
  }

  type Query {
    getUsers: [User]
    getUser(where: UserFilterId!): User
  }

  type Mutation {
    createUser(data: UserCreateInput!): User
    updateUser(where: UserFilterId!, data: UserUpdateInput!): User
    deleteUser(where: UserFilterId!): User
  }
`;

export { UserTypes };
