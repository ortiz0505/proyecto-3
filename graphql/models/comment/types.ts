import { gql } from 'apollo-server-micro';

const CommentTypes = gql`
  type Comment {
    id: ID
    comment: String!
    response: Response
    responseId: String
    admin: User
    userId: String
    document: Document
    documentId: String
    createAt: Date
    updateAt: Date
  }

  input CommentFilterId {
    id: String!
  }

  input CommentCreateInput {
    comment: String!
    userId: String!
    documentId: String!
  }

  input CommentUpdateInput {
    comment: StringEditField!
    responseId: StringEditField!
    userId: StringEditField!
    documentId: StringEditField!
  }

  type Query {
    getComments: [Comment]
    getComment(where: CommentFilterId!): Comment
  }

  type Mutation {
    createComment(data: CommentCreateInput!): Comment
    updateComment(where: CommentFilterId!, data: CommentUpdateInput!): Comment
    deleteComment(where: CommentFilterId): Comment
  }
`;

export { CommentTypes };
