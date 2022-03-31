import React from 'react';
import { signIn, useSession } from 'next-auth/react';

const PrivateLayout = ({ children }: any) => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loadign...</div>;
  }

  if (!session) {
    signIn('auth0');
    return <div>Loading...</div>;
  }

  return <div>{children}</div>;
};

export default PrivateLayout;
