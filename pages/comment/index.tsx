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
    <div>
      <div>Documentos con respuesta</div>
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
    <div className='flex flex-col'>
      <span>Documento: </span>
      <span>{pendingDoc.comment.document.name} </span>
      <span>Tipo de documento: </span>
      <span>{pendingDoc.comment.document.typeDocument.name} </span>
      <span>Estado del documento: </span>
      <span>{pendingDoc.comment.document.status} </span>
      <span>Formato: </span>
      <span>{pendingDoc.comment.document.typeDocument.format} </span>
      <span>Comentario: </span>
      <span>{pendingDoc.comment.comment} </span>
      <span>Respuesta: </span>
      <span>{pendingDoc.response} </span>
      <button
        type='button'
        className='bg-green-300'
        onClick={() => {
          acepptStatusDocument(pendingDoc);
        }}
      >
        aceptar documento
      </button>
    </div>
  );
};
export default CommentIndex;
