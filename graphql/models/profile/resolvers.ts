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

  Query: {
    getProfiles: async (parent, args) => {
      return await prisma.profile.findMany({});
    },
  },

  Mutation: {
    upsertProfile: async (parent, args) => {
      return await prisma.profile.upsert({
        where: { ...args.where },
        create: { ...args.create },
        update: { ...args.update },
      });
    },
  },
};

export { ProfileResolvers };
