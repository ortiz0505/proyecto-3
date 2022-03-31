import prisma from 'config/prisma';

const CommentResolvers = {
  Comment: {
    response: async (parent, args) => {
      await prisma.response.findUnique({
        where: {
          id: parent.responseId,
        },
      });
    },
    admin: async (parent, args) => {
      await prisma.user.findUnique({
        where: {
          id: parent.userId,
        },
      });
    },
    document: async (parent, args) => {
      await prisma.document.findUnique({
        where: {
          id: parent.documentId,
        },
      });
    },
  },

  Query: {
    getComments: async (parent, args) => {
      await prisma.comment.findMany({});
    },
    getComment: async (parent, args) => {
      await prisma.comment.findUnique({
        where: { ...args.where },
      });
    },
  },

  Mutation: {
    createComment: async (parent, args) => {
      await prisma.comment.create({
        data: {
          ...args.data,
        },
      });
    },
    updateComment: async (parent, args) => {
      await prisma.comment.update({
        where: { ...args.where },
        data: {
          ...args.data,
        },
      });
    },
    deleteComment: async (parent, args) => {
      await prisma.comment.delete({
        where: { ...args.where },
      });
    },
  },
};

export { CommentResolvers };
