/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import prisma from 'config/prisma';
import { getSession } from 'next-auth/react';

const matchRoles = async (context) => {
  let url = context.resolvedUrl.split('?')[0];
  const { user } = context.query;
  if (user) {
    url = url.replace(user, '[user]');
  }

  const data: any = await getSession({ req: context.req });
  const userRole = data?.user?.role?.name;

  const page = await prisma.page.findUnique({
    where: {
      path: url,
    },
    include: {
      roles: true,
    },
  });

  return {
    auth: page.roles.map((rol) => rol.name).includes(userRole),
    page: page.name,
  };
};

export { matchRoles };
