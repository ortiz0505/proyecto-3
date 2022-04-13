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
    createdBy: async (parent, args) => {
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
    getPendingDocument: async (parents, args) => {
      return await prisma.document.findMany({
        where: {
          status: 'Pending',
        },
      });
    },
    getRejectedDocument: async (parents, args) => {
      return await prisma.document.findMany({
        where: {
          userId: args.where.id,
          status: 'Rejected',
        },
      });
    },
    getRejectedDocuments: async (parents, args) => {
      return await prisma.document.findMany({
        where: {
          status: 'Rejected',
        },
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
