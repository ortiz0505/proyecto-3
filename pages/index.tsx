import PrivateComponent from '@components/PrivateComponent';
import type { NextPage } from 'next';
import { signOut } from 'next-auth/react';
import { matchRoles } from 'utils/matchRoles';

export const getServerSideProps = async (context) => ({
  props: { ...(await matchRoles(context)) },
});

const Home: NextPage = () => {
  return (
    <div className='bg-slate-600'>
      Index
      <PrivateComponent roleList={['Admin']}>
        <div>Ejemplo de private component</div>
      </PrivateComponent>
      <button
        type='button'
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
