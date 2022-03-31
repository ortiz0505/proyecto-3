import prisma from 'config/prisma';

const TypeDocumentResolvers = {
  TypeDocument: {
    template: async (parent, args) => {
      return await prisma.template.findMany({
        where: {
          typeDocumentId: parent.id,
        },
      });
    },
    documents: async (parent, args) => {
      return await prisma.document.findMany({
        where: {
          typeDocumentId: parent.id,
        },
      });
    },
  },

  Query: {
    getTypeDocuments: async (parent, args) => {
      return await prisma.typeDocument.findMany({});
    },
    getTypeDocument: async (parent, args) => {
      return await prisma.typeDocument.findUnique({
        where: { ...args.where },
      });
    },
  },

  Mutation: {
    createTypeDocument: async (parent, args) => {
      return await prisma.typeDocument.create({
        data: {
          ...args.data,
        },
      });
    },
    updateTypeDocument: async (parent, args) => {
      return await prisma.typeDocument.update({
        where: { ...args.where },
        data: {
          ...args.data,
        },
      });
    },
    deleteTypeDocument: async (parent, args) => {
      return await prisma.typeDocument.delete({
        where: { ...args.where },
      });
    },
  },
};

export { TypeDocumentResolvers };
