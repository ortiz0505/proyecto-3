import prisma from 'config/prisma';

const DocumentResolvers = {
  Document: {
    comment: async (parent, args) => {
      return await prisma.comment.findMany({
        where: {
          documentId: parent.id,
        },
      });
    },
    typeDocument: async (parent, args) => {
      return await prisma.typeDocument.findUnique({
        where: {
          id: parent.typeDocumentId,
        },
      });
    },
    createBy: async (parent, args) => {
      return await prisma.user.findUnique({
        where: {
          id: parent.userId,
        },
      });
    },
  },

  Query: {
    getDocuments: async (parent, args) => {
      return await prisma.document.findMany({});
    },
    getDocument: async (parent, args) => {
      return await prisma.document.findUnique({
        where: { ...args.where },
      });
    },
  },

  Mutation: {
    createDocument: async (parent, args) => {
      return await prisma.document.create({
        data: {
          ...args.data,
        },
      });
    },
    updateDocument: async (parent, args) => {
      return await prisma.document.update({
        where: { ...args.where },
        data: {
          ...args.data,
        },
      });
    },
    deleteDocument: async (parent, args) => {
      return await prisma.document.delete({
        where: { ...args.where },
      });
    },
  },
};

export { DocumentResolvers };
