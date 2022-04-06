import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import NavBar from 'components/NavBar';
import Loading from 'components/Loading';

const PrivateLayout = ({ children }: any) => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Loading />;
  }

  if (!session) {
    signIn('auth0');
    return <Loading />;
  }

  return (
    <div>
      <NavBar />
      {children}
      <ToastContainer />
    </div>
  );
};

export default PrivateLayout;