import prisma from 'config/prisma';

const CommentResolvers = {
  Comment: {
    response: async (parent, args) => {
      return await prisma.response.findUnique({
        where: {
          commentId: parent.id,
        },
      });
    },
    admin: async (parent, args) => {
      return await prisma.user.findUnique({
        where: {
          id: parent.userId,
        },
      });
    },
    document: async (parent, args) => {
      return await prisma.document.findUnique({
        where: {
          id: parent.documentId,
        },
      });
    },
  },

  Query: {
    getComments: async (parent, args) => {
      return await prisma.comment.findMany({});
    },
    getComment: async (parent, args) => {
      return await prisma.comment.findUnique({
        where: { ...args.where },
      });
    },
  },

  Mutation: {
    createComment: async (parent, args) => {
      return await prisma.comment.create({
        data: {
          ...args.data,
        },
      });
    },
    updateComment: async (parent, args) => {
      return await prisma.comment.update({
        where: { ...args.where },
        data: {
          ...args.data,
        },
      });
    },
    deleteComment: async (parent, args) => {
      return await prisma.comment.delete({
        where: { ...args.where },
      });
    },
  },
};

export { CommentResolvers };
