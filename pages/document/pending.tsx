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
        <span>{new Date(pendingDoc.createdAt).toLocaleDateString()}</span>
      </div>
      <div className='cardButtonP'>
        <div className='flex flex-row'>
          <button
            className='approvalButtons'
            type='button'
            onClick={() => {
              acepptStatusDocument(pendingDoc);
            }}
          >
            Aceptar
          </button>
          <button
            className='approvalButtons'
            type='button'
            onClick={() => setOpenCommentDialog(true)}
          >
            Rechazar
          </button>
          <Dialog open={openCommentDialog} onClose={closeDialog}>
            <div className='m-5'>
              <div className='dialogTitles'>Rechazar</div>
              <span className='m-2 pplSpanLabels'>Comentario: </span>
              <input
                className='dialogInput'
                name='comment'
                placeholder='El documento tiene fallas'
                onChange={(e) => setComment(e.target.value)}
              />
              <div className='flex flex-row mx-5'>
                <button
                  type='button'
                  className='dialogButtons'
                  onClick={async () => {
                    await rejectDocument(pendingDoc);
                    await createCommentDocument(pendingDoc);
                  }}
                >
                  Rechazar documento
                </button>
                <button
                  type='button'
                  className='dialogButtons'
                  onClick={() => {
                    setOpenCommentDialog(false);
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </Dialog>
          <button
            type='button'
            className='approvalButtons'
            onClick={() => {
              setOpenEditDialog(true);
            }}
          >
            Editar
          </button>
          <Dialog open={openEditDialog} onClose={closeDialog}>
            <div className='m-5'>
              <div className='dialogTitles'>Editar</div>
              <span className='m-2 pplSpanLabels'>Nombre</span>
              <input
                className='dialogInput'
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
              <div className='flex flex-row mx-5'>
                <button
                  type='button'
                  className='dialogButtons'
                  onClick={() => {
                    editDocument(pendingDoc);
                  }}
                >
                  Editar
                </button>
                <button
                  type='button'
                  className='dialogButtons'
                  onClick={() => {
                    setOpenEditDialog(false);
                  }}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </Dialog>
        </div>
        <span className='cursor-pointer font-medium hover:font-bold'>
          <a target='_blank' rel='noreferrer' href={pendingDoc.url} download>
            Descargar
            <i className='fa-solid fa-file-arrow-down m-2'> </i>
          </a>
        </span>
      </div>
    </div>
  );
};

export default Pending;
