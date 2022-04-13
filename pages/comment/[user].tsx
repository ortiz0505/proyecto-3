import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { matchRoles } from 'utils/matchRoles';
import { GET_REJECTED_DOCUMENT } from 'graphql/queries/document';
import { useMutation, useQuery } from '@apollo/client';
import Loading from '@components/Loading';
import { CREATE_RESPONSE } from 'graphql/mutations/response';

export const getServerSideProps = async (context) => ({
  props: { ...(await matchRoles(context)) },
});

const Comments = () => {
  const router = useRouter();
  const { data, loading } = useQuery(GET_REJECTED_DOCUMENT, {
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: router.query.user,
      },
    },
  });

  if (loading) return <Loading />;
  return (
    <div>
      <p>Documentos rechazados {router.query.user}</p>
      <div className='flex flex-col md:flex-row'>
        {data?.getRejectedDocument.map((doc) => (
          <RejectedDocument key={doc.id} pendingDoc={doc} />
        ))}
      </div>
    </div>
  );
};

const RejectedDocument = ({ pendingDoc }) => {
  return (
    <div className='cardBodyP'>
      <div className='cardTopP'>
        <span className='font-bold'>Nombre:</span>
        <span>{pendingDoc.name}</span>
        <span className='font-bold'>Estado:</span>
        <span>{pendingDoc.status}</span>
        {pendingDoc.comment.map((com) => {
          return <ListComments key={com.id} comments={com} />;
        })}
      </div>
    </div>
  );
};

const ListComments = ({ comments }) => {
  const [res, setRes] = useState('');
  const [createResponse] = useMutation(CREATE_RESPONSE, {
    refetchQueries: [GET_REJECTED_DOCUMENT],
  });
  const createResponseComment = async (e) => {
    await createResponse({
      variables: {
        data: {
          response: res,
          commentId: e.id,
        },
      },
    });
  };
  return (
    <>
      <span>Comentario: </span>
      <span>{comments.comment}</span>
      <span>Respuesta: </span>
      <span>{comments.response?.response}</span>
      {comments.response?.response === undefined ? (
        <div>
          {' '}
          <input
            name='response'
            placeholder='respuesta ejemplo'
            onChange={(e) => {
              setRes(e.target.value);
            }}
          />
          <button
            type='button'
            onClick={() => {
              createResponseComment(comments);
            }}
          >
            <span className='cursor-pointer font-bold'>Responder</span>
          </button>
        </div>
      ) : (
        'esperando revisión del admin'
      )}
    </>
  );
};

export default Comments;
