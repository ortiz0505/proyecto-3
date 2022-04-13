import PrivateComponent from '@components/PrivateComponent';
import type { NextPage } from 'next';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { matchRoles } from 'utils/matchRoles';

export const getServerSideProps = async (context) => ({
  props: { ...(await matchRoles(context)) },
});

const Home: NextPage = () => {
  const { data: session } = useSession();
  return (
    <div className='pplContainers flex flex-row'>
      <div className='flex flex-col p-2'>
        <Image
          alt='user Profile'
          src={session.user.image}
          width='100'
          height='100'
          className='rounded-full'
        />
        <div className='profileButtons'>Cambiar foto</div>
        <PrivateComponent roleList={['Admin']}>
          <div className='profileButtons'>
            <Link href='document/new'>Mis documentos pendientes</Link>
          </div>
          <div className='profileButtons'>
            <Link href={`comment/${session.userId}`}>Mis comentarios</Link>
          </div>
        </PrivateComponent>
      </div>
      <div className='w-1/2 flex flex-col'>
        <span className='pplTitles'>Información personal</span>
        <div className='flex flex-row items-center'>
          <span className='pplSpanLabels'>Nombre:</span>
          <span>Nombre</span>
        </div>
        <div className='flex flex-row items-center'>
          <span className='pplSpanLabels'>Email:</span>
          <span>Email</span>
        </div>
        <div className='flex flex-row items-center'>
          <span className='pplSpanLabels'>Telefono:</span>
          <span>Telefono</span>
        </div>
        <div className='flex flex-row items-center'>
          <span className='pplSpanLabels'>Dirección:</span>
          <span>Dirección</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
