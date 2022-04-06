import { gql } from 'apollo-server-micro';

const RoleTypes = gql`
  type Role {
    id: ID
    name: Enum_Role
    users: [User]
    page: [Page]
    createdAt: Date
    updatedAt: Date
  }

  enum Enum_Role {
    Admin
    Documenter
    Developer
  }

  type Query {
    getRoles: [Role]
  }
`;

export { RoleTypes };
