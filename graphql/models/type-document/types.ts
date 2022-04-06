import { gql } from 'apollo-server-micro';

const typeDocumentTypes = gql`
  type TypeDocument {
    id: ID
    name: String
    format: String
    template: String
    documents: [Document]
    createdAt: Date
    updatedAt: Date
  }

  input TypeDocumentFilterId {
    id: String!
  }

  input TypeDocumentCreateInput {
    name: String
    format: String
    template: String
  }

  input TypeDocumentUpdateInput {
    name: StringEditField
    format: StringEditField
  }

  type Query {
    getTypeDocuments: [TypeDocument]
    getTypeDocument(where: TypeDocumentFilterId!): TypeDocument
  }

  type Mutation {
    createTypeDocument(data: TypeDocumentCreateInput!): TypeDocument
    updateTypeDocument(
      where: TypeDocumentFilterId!
      data: TypeDocumentUpdateInput!
    ): TypeDocument
    deleteTypeDocument(where: TypeDocumentFilterId): TypeDocument
  }
`;

export { typeDocumentTypes };
