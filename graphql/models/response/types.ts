import { gql } from 'apollo-server-micro';

const ResponseTypes = gql`
  type Response {
    id: ID
    response: String
    comment: Comment
    commentId: String
    createdAt: Date
    updatedAt: Date
  }
  input ResponseFilterId {
    id: String!
  }

  input ResponseCreateInput {
    response: String
    commentId: String
  }

  input ResponseUpdateInput {
    response: StringEditField
    commentId: StringEditField
  }

  type Query {
    getResponses: [Response]
    getResponse(where: ResponseFilterId!): Response
  }

  type Mutation {
    createResponse(data: ResponseCreateInput!): Response
    updateResponse(
      where: ResponseFilterId!
      data: ResponseUpdateInput!
    ): Response
    deleteResponse(where: ResponseFilterId): Response
  }
`;

export { ResponseTypes };
