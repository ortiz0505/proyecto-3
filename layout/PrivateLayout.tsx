import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const PrivateLayout = ({ children }: any) => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loadign...</div>;
  }

  if (!session) {
    signIn('auth0');
    return <div>Loading...</div>;
  }

  return (
    <div>
      {children}
      <ToastContainer />
    </div>
  );
};

export default PrivateLayout;
