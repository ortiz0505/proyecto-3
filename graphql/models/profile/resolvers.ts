import prisma from 'config/prisma';

const ProfileResolvers = {
  Profile: {
    user: async (parent, args) => {
      return await prisma.user.findUnique({
        where: {
          id: parent.userId,
        },
      });
    },
  },
};

export { ProfileResolvers };
