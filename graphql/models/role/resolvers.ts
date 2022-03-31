import prisma from 'config/prisma';

const RoleResolvers = {
  Role: {
    users: async (parent, args) => {
      return await prisma.user.findMany({
        where: {
          roleId: parent.id,
        },
      });
    },
    page: async (parent, args) => {
      return await prisma.page.findMany({
        where: {
          roles: {
            some: {
              id: parent.id,
            },
          },
        },
      });
    },
  },

  Query: {
    getRoles: async (parent, args) => {
      return await prisma.role.findMany({});
    },
    // getRole: async (parent, args) => {
    //   return await prisma.role.findUnique({
    //     where: { ...args.where },
    //   });
    // },
  },

  //   Mutation: {
  //     createRole: async (parent, args) => {
  //       return await prisma.role.create({
  //         data: {
  //           ...args.data,
  //         },
  //       });
  //     },
  //     updateRole: async (parent, args) => {
  //       return await prisma.role.update({
  //         where: { ...args.where },
  //         data: {
  //           ...args.data,
  //         },
  //       });
  //     },
  //     deleteRole: async (parent, args) => {
  //       return await prisma.role.delete({
  //         where: { ...args.where },
  //       });
  //     },
  //   },
};

export { RoleResolvers };
