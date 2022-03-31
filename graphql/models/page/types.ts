import { gql } from 'apollo-server-micro';

const PageTypes = gql`
  type Page {
    id: ID
    name: String
    path: String
    roles: [Role]
    createAt: Date
    updateAt: Date
  }

  input PageFilterId {
    id: String!
  }

  input PageCreateInput {
    name: String
    path: String
  }

  type Query {
    getPages: [Page]
    getPage(where: PageFilterId!): Page
  }

  type Mutation {
    createPage(data: PageCreateInput!): Page
  }
`;

export { PageTypes };
