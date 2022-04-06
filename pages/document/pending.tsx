import { useQuery } from '@apollo/client';
import Loading from '@components/Loading';
import { GET_PENDING_DOCUMENT } from 'graphql/queries/document';
import React from 'react';
import { matchRoles } from 'utils/matchRoles';

export const getServerSideProps = async (context) => ({
  props: { ...(await matchRoles(context)) },
});

const Pending = () => {
  const { data, loading } = useQuery(GET_PENDING_DOCUMENT, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Loading />;

  return (
    <div className='pplContainers'>
      <div className='pplTitles text-center md:text-left'>
        Documentos por aprobar
      </div>
      <div className='flex flex-col md:flex-row'>
        {data?.getPendingDocument.map((doc) => (
          <PendingDocument key={doc.id} pendingDoc={doc} />
        ))}
      </div>
    </div>
  );
};

const PendingDocument = ({ pendingDoc }) => (
  <div className='cardBodyP'>
    <div className='cardTopP'>
      <span className='font-bold'>Nombre:</span>
      <span>{pendingDoc.name}</span>
      <span className='font-bold'>Tipo de documento:</span>
      <span>{pendingDoc.typeDocument.name}</span>
      <span className='font-bold'>Creado por:</span>
      <span>{pendingDoc.createdBy.name}</span>
      <span className='font-bold'>Fecha de creación:</span>
      <span>{pendingDoc.createdAt}</span>
    </div>
    <div className='cardButtonP'>
      <div className='flex flex-row justify-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-7 w-7 fill-green-500 mx-10 cursor-pointer'
          viewBox='0 0 20 20'
        >
          <path
            fillRule='evenodd'
            d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
            clipRule='evenodd'
          />
        </svg>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-7 w-7 fill-red-500 mx-10 cursor-pointer'
          viewBox='0 0 20 20'
        >
          <path
            fillRule='evenodd'
            d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
            clipRule='evenodd'
          />
        </svg>
      </div>
      <span className='cursor-pointer font-medium'>Descargar</span>
    </div>
  </div>
);

export default Pending;
