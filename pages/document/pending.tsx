import { useMutation, useQuery } from '@apollo/client';
import FileUpload from '@components/FileUpload';
import Loading from '@components/Loading';
import { Dialog } from '@mui/material';
import { CREATE_COMMENT } from 'graphql/mutations/comment';
import { UPDATE_DOCUMENT } from 'graphql/mutations/document';
import { GET_PENDING_DOCUMENT } from 'graphql/queries/document';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
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

const PendingDocument = ({ pendingDoc }) => {
  const { data: session } = useSession();
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [comment, setComment] = useState('');
  const closeDialog = () => {
    setOpenCommentDialog(false);
  };
  const [createComment] = useMutation(CREATE_COMMENT);
  const [updateDocument] = useMutation(UPDATE_DOCUMENT, {
    refetchQueries: [GET_PENDING_DOCUMENT],
  });
  const createCommentDocument = async (e) => {
    await createComment({
      variables: {
        data: {
          comment,
          userId: session.userId,
          documentId: e.id,
        },
      },
    });
  };
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
  const rejectDocument = async (e) => {
    await updateDocument({
      variables: {
        where: {
          id: e.id,
        },
        data: {
          status: {
            set: 'Rejected',
          },
        },
      },
    });
  };
  const [template, setTemplate] = useState(pendingDoc.url);
  const [name, setName] = useState('');
  const successCallBack = (e) => {
    setTemplate(e.info.secure_url);
  };
  const editDocument = async (e) => {
    await updateDocument({
      variables: {
        where: {
          id: e.id,
        },
        data: {
          name: {
            set: name,
          },
          url: {
            set: template,
          },
        },
      },
    });
    toast.success('Documento editado!');
  };
  const failureCallBack = () => {
    toast.error('Error al cargar el archivo');
  };
  return (
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
          <button
            type='button'
            onClick={() => {
              acepptStatusDocument(pendingDoc);
            }}
          >
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
          </button>
          <button type='button' onClick={() => setOpenCommentDialog(true)}>
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
            <Dialog open={openCommentDialog} onClose={closeDialog}>
              <div className='p-4 flex flex-col'>
                <span>Comentario: </span>
                <input
                  name='comment'
                  placeholder='El documento tiene fallas'
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  type='button'
                  onClick={async () => {
                    await rejectDocument(pendingDoc);
                    await createCommentDocument(pendingDoc);
                  }}
                >
                  Rechazar documento
                </button>
              </div>
            </Dialog>
          </button>
          <button
            type='button'
            onClick={() => {
              setOpenEditDialog(true);
            }}
          >
            Editar
          </button>
          <Dialog open={openEditDialog} onClose={closeDialog}>
            <div className='p-5'>
              <span>Nombre</span>
              <input
                name='name'
                placeholder='Nombre del documento'
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <FileUpload
                folder='document'
                resourceType='auto'
                text='Crear nueva version'
                successCallBack={successCallBack}
                failureCallBack={failureCallBack}
              />
              <button
                type='button'
                onClick={() => {
                  editDocument(pendingDoc);
                }}
              >
                Editar documento
              </button>
              <button
                type='button'
                onClick={() => {
                  setOpenEditDialog(false);
                }}
              >
                cerrar dialog
              </button>
            </div>
          </Dialog>
        </div>
        <span className='cursor-pointer font-medium'>Descargar</span>
      </div>
    </div>
  );
};

export default Pending;
