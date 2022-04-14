import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Nav from '@components/Nav';
import Lod from '@components/Lod';


const PrivateLayout = ({ children }: any) => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Lod />;
  }

  if (!session) {
    signIn('auth0');
    return <Lod />;
  }

  return (
    <div>
      <Nav />
      {children}
      <ToastContainer />
    </div>
  );
};

export default PrivateLayout;
