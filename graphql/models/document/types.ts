import { gql } from 'apollo-server-micro';

const DocumentTypes = gql`
  type Document {
    id: ID
    name: String
    url: String
    status: Enum_Status
    comment: [Comment]
    typeDocument: TypeDocument
    typeDocumentId: String
    createdBy: User
    userId: String
    createdAt: Date
    updatedAt: Date
  }

  enum Enum_Status {
    Accepted
    Pending
    Rejected
  }

  input DocumentFilterId {
    id: String!
  }

  input DocumentCreateInput {
    url: String!
    name: String!
    status: Enum_Status!
    typeDocumentId: String
    userId: String
  }

  input DocumentUpdateInput {
    url: StringEditField
    status: StringEditField
    typeDocumentId: StringEditField
    userId: StringEditField
  }

  type Query {
    getDocuments: [Document]
    getDocument(where: DocumentFilterId!): Document
    getPendingDocument: [Document]
  }

  type Mutation {
    createDocument(data: DocumentCreateInput!): Document
    updateDocument(where: DocumentFilterId, data: DocumentUpdateInput): Document
    deleteDocument(where: DocumentFilterId): Document
  }
`;

export { DocumentTypes };
