import prisma from 'config/prisma';

const UserResolvers = {
  User: {
    role: async (parent, args) => {
      return prisma.role.findUnique({
        where: {
          id: parent.roleId,
        },
      });
    },
    comments: async (parent, args) => {
      return await prisma.comment.findMany({
        where: {
          userId: parent.id,
        },
      });
    },
    documents: async (parent, args) => {
      return await prisma.document.findMany({
        where: {
          userId: parent.id,
        },
      });
    },
    profile: async (parent, args) => {
      return prisma.profile.findUnique({
        where: {
          userId: parent.id,
        },
      });
    },
  },

  Query: {
    getUsers: async (parent, args) => {
      return await prisma.user.findMany({});
    },
    getUser: async (parent, args) => {
      return await prisma.user.findUnique({
        where: { ...args.where },
      });
    },
  },

  Mutation: {
    createUser: async (parent, args) => {
      return await prisma.user.create({
        data: {
          ...args.data,
        },
      });
    },
    updateUser: async (parent, args) => {
      return await prisma.user.update({
        where: { ...args.where },
        data: {
          ...args.data,
        },
      });
    },
    deleteUser: async (parent, args) => {
      return await prisma.user.delete({
        where: { ...args.where },
      });
    },
  },
};

export { UserResolvers };
