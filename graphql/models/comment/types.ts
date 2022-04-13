import { gql } from 'apollo-server-micro';

const CommentTypes = gql`
  type Comment {
    id: ID
    comment: String!
    response: Response
    admin: User
    userId: String
    document: Document
    documentId: String
    createdAt: Date
    updatedAt: Date
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
