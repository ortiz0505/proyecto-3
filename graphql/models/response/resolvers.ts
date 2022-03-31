import prisma from 'config/prisma';

const ResponseResolvers = {
  Response: {
    comment: async (parent, args) => {
      return await prisma.comment.findUnique({
        where: {
          id: parent.commentId,
        },
      });
    },
  },

  Query: {
    getResponses: async (parent, args) => {
      return await prisma.response.findMany({});
    },
    getResponse: async (parent, args) => {
      return await prisma.response.findUnique({
        where: { ...args.where },
      });
    },
  },

  Mutation: {
    createResponse: async (parent, args) => {
      return await prisma.response.create({
        data: {
          ...args.data,
        },
      });
    },
    updateResponse: async (parent, args) => {
      return await prisma.response.update({
        where: { ...args.where },
        data: {
          ...args.data,
        },
      });
    },
    deleteResponse: async (parent, args) => {
      return await prisma.response.delete({
        where: { ...args.where },
      });
    },
  },
};

export { ResponseResolvers };
