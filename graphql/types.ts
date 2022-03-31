import { gql } from 'apollo-server-micro';
import { CommentTypes } from 'graphql/models/comment/types';
import { DocumentTypes } from 'graphql/models/document/types';
import { PageTypes } from 'graphql/models/page/types';
import { ProfileTypes } from 'graphql/models/profile/types';
import { ResponseTypes } from 'graphql/models/response/types';
import { RoleTypes } from 'graphql/models/role/types';
import { TemplateTypes } from 'graphql/models/template/types';
import { typeDocumentTypes } from 'graphql/models/type-document/types';
import { UserTypes } from 'graphql/models/user/types';

const genericTypes = gql`
  scalar Date

  input StringEditField {
    set: String
  }

  input DateEditField {
    set: Date
  }
`;

export const types = [
  genericTypes,
  CommentTypes,
  DocumentTypes,
  PageTypes,
  ProfileTypes,
  ResponseTypes,
  RoleTypes,
  TemplateTypes,
  typeDocumentTypes,
  UserTypes,
];
