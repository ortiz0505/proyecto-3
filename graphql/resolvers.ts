import { CommentResolvers } from 'graphql/models/comment/resolvers';
import { DocumentResolvers } from 'graphql/models/document/resolvers';
import { PageResolvers } from 'graphql/models/page/resolvers';
import { ProfileResolvers } from 'graphql/models/profile/resolvers';
import { ResponseResolvers } from 'graphql/models/response/resolvers';
import { RoleResolvers } from 'graphql/models/role/resolvers';
import { TypeDocumentResolvers } from 'graphql/models/type-document/resolvers';
import { UserResolvers } from 'graphql/models/user/resolvers';
import { ChartResolvers } from 'graphql/models/chart/resolvers';

export const resolvers = [
  CommentResolvers,
  DocumentResolvers,
  PageResolvers,
  ProfileResolvers,
  ResponseResolvers,
  RoleResolvers,
  TypeDocumentResolvers,
  UserResolvers,
  ChartResolvers,
];
