import { signOut } from 'next-auth/react';
import React from 'react';

const NotAuthorized = () => (
  <div>
    <button
      type='button'
      onClick={() => {
        signOut();
      }}
    >
      Logout
    </button>
    <div className='bg-red-700 text-4xl text-white font-extrabold p-10 text-center'>
      No estas autorizado para entrar a esta pagina
    </div>
  </div>
);

export default NotAuthorized;
