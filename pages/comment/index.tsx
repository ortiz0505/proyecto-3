import { useMutation, useQuery } from '@apollo/client';
import Lod from '@components/Lod';
import PrivateComponent from '@components/PrivateComponent';
import { UPDATE_DOCUMENT } from 'graphql/mutations/document';
import { GET_RESPONSED_DOCUMENT } from 'graphql/queries/response';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { matchRoles } from 'utils/matchRoles';

export const getServerSideProps = async (context) => ({
  props: { ...(await matchRoles(context)) },
});

const CommentIndex = () => {
  const { data: session } = useSession();
  const { data, loading } = useQuery(GET_RESPONSED_DOCUMENT, {
    fetchPolicy: 'cache-and-network',
  });
  if (loading) return <Lod />;
  return (
    <div className='pplContainers'>
      <div className='flex flex-col md:flex-row md:justify-between'>
        <div className='pplTitles'>Documentos con respuesta</div>
        <Link href={`comment/${session.userId}`} passHref>
          <div className='flex items-center justify-center md:w-1/3 cursor-pointer pplButtons'>
            <div className='text-[#E6F4F1] mx-2'>Ver mis comentarios</div>
          </div>
        </Link>
      </div>
      <div className='flex flex-col md:flex-row'>
        {data?.getResponses.map((doc) => (
          <ListDocument key={doc.id} pendingDoc={doc} />
        ))}
      </div>
    </div>
  );
};

const ListDocument = ({ pendingDoc }) => {
  const [updateDocument] = useMutation(UPDATE_DOCUMENT, {
    refetchQueries: [GET_RESPONSED_DOCUMENT],
  });
  const acepptStatusDocument = async (e) => {
    await updateDocument({
      variables: {
        where: {
          id: e.id,
        },
        data: {
          status: {
            set: 'Accepted',
          },
        },
      },
    });
  };
  return (
    <div className='cardBodyP'>
      <div className='cardTopP items-center'>
        <span className='font-bold'>Documento: </span>
        <span className='ml-1'>{pendingDoc.comment.document.name} </span>
        <span className='font-bold'>Tipo de documento: </span>
        <span className='ml-1'>
          {pendingDoc.comment.document.typeDocument.name}{' '}
        </span>
        <span className='font-bold'>Estado del documento: </span>
        <span className='ml-1'>{pendingDoc.comment.document.status} </span>
        <span className='font-bold'>Formato: </span>
        <span className='ml-1'>
          {pendingDoc.comment.document.typeDocument.format}{' '}
        </span>
        <span className='font-bold'>Comentario: </span>
        <span className='ml-1'>{pendingDoc.comment.comment} </span>
        <span className='font-bold'>Respuesta: </span>
        <span className='ml-1'>{pendingDoc.response} </span>
      </div>
      <PrivateComponent roleList={['Admin']}>
        <button
          type='button'
          className='cardButton'
          onClick={() => {
            acepptStatusDocument(pendingDoc);
          }}
        >
          Aceptar documento
        </button>
      </PrivateComponent>
    </div>
  );
};
export default CommentIndex;
