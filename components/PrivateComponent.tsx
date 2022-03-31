import { useSession } from 'next-auth/react';
import React from 'react';

const PrivateComponent = ({ roleList, children }) => {
  const { data: session }: any = useSession();
  const roleUser = session?.user?.role?.name;
  const roleCheck = roleList.includes(roleUser);

  if (roleCheck) {
    return children;
  }

  return <></>;
};

export default PrivateComponent;
