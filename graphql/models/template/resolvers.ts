import prisma from 'config/prisma';

const TemplateResolvers = {
  Template: {
    typeDocument: async (parent, args) => {
      return await prisma.typeDocument.findUnique({
        where: {
          id: parent.typeDocumentId,
        },
      });
    },
  },

  Query: {
    getTemplates: async (parent, args) => {
      return await prisma.template.findMany({});
    },
    getTemplate: async (parent, args) => {
      return await prisma.template.findUnique({
        where: { ...args.where },
      });
    },
  },

  Mutation: {
    createTemplate: async (parent, args) => {
      return await prisma.template.create({
        data: {
          ...args.data,
        },
      });
    },
    updateTemplate: async (parent, args) => {
      return await prisma.template.update({
        where: { ...args.where },
        data: {
          ...args.data,
        },
      });
    },
    deleteTemplate: async (parent, args) => {
      return await prisma.template.delete({
        where: { ...args.where },
      });
    },
  },
};

export { TemplateResolvers };
