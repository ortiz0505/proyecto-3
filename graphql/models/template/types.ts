import { gql } from 'apollo-server-micro';

const TemplateTypes = gql`
  type Template {
    id: ID
    name: String
    typeDocument: TypeDocument
    typeDocumentId: String
    createAt: Date
    updateAt: Date
  }

  input TemplateFilterId {
    id: String!
  }

  input TemplateCreateInput {
    name: String
    typeDocumentId: String
  }

  input TemplateUpdateInput {
    name: StringEditField
    typeDocumentId: StringEditField
  }

  type Query {
    getTemplates: [Template]
    getTemplate(where: TemplateFilterId!): Template
  }

  type Mutation {
    createTemplate(data: TemplateCreateInput!): Template
    updateTemplate(
      where: TemplateFilterId!
      data: TemplateUpdateInput!
    ): Template
    deleteTemplate(where: TemplateFilterId): Template
  }
`;

export { TemplateTypes };
