import prisma from 'config/prisma';

const PageResolvers = {
  Page: {
    roles: async (parent, args) => {
      return await prisma.role.findMany({
        where: {
          page: {
            some: {
              id: parent.id,
            },
          },
        },
      });
    },
  },
};

export { PageResolvers };
