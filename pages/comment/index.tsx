import { useMutation, useQuery } from '@apollo/client';
import Loading from '@components/Loading';
import { UPDATE_DOCUMENT } from 'graphql/mutations/document';
import { GET_RESPONSED_DOCUMENT } from 'graphql/queries/response';
import React from 'react';
import { matchRoles } from 'utils/matchRoles';

export const getServerSideProps = async (context) => ({
  props: { ...(await matchRoles(context)) },
});

const CommentIndex = () => {
  const { data, loading } = useQuery(GET_RESPONSED_DOCUMENT, {
    fetchPolicy: 'cache-and-network',
  });
  if (loading) return <Loading />;
  return (
    <div className='pplContainers'>
      <div className='pplTitles'>Documentos con respuesta</div>
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
      <button
        type='button'
        className='cardButton'
        onClick={() => {
          acepptStatusDocument(pendingDoc);
        }}
      >
        Aceptar documento
      </button>
    </div>
  );
};
export default CommentIndex;
