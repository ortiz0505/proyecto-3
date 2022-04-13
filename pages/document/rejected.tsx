import { useMutation, useQuery } from '@apollo/client';
import FileUpload from '@components/FileUpload';
import Loading from '@components/Loading';
import { UPDATE_DOCUMENT } from 'graphql/mutations/document';
import { GET_REJECTED_DOCUMENTS } from 'graphql/queries/document';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { matchRoles } from 'utils/matchRoles';

export const getServerSideProps = async (context) => ({
  props: { ...(await matchRoles(context)) },
});

const Rejected = () => {
  const { data, loading } = useQuery(GET_REJECTED_DOCUMENTS, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Loading />;

  return (
    <div>
      <div>Documentos rechazados</div>
      <div className='flex flex-col md:flex-row'>
        {data?.getRejectedDocuments.map((doc) => (
          <RejectedDocument key={doc.id} rejectedDoc={doc} />
        ))}
      </div>
    </div>
  );
};

const RejectedDocument = ({ rejectedDoc }) => {
  const [updateDocument] = useMutation(UPDATE_DOCUMENT, {
    refetchQueries: [GET_REJECTED_DOCUMENTS],
  });
  const [template, setTemplate] = useState();
  const successCallBack = (e) => {
    setTemplate(e.info.secure_url);
  };
  const newDocumentVersion = async (e) => {
    await updateDocument({
      variables: {
        where: {
          id: e.id,
        },
        data: {
          status: {
            set: 'Pending',
          },
          url: {
            set: template,
          },
        },
      },
    });
    toast.success('Documento enviado para revision!');
  };
  const failureCallBack = () => {
    toast.error('Error al cargar el archivo');
  };
  return (
    <div className='flex flex-col'>
      <span>Nombre del documento:</span>
      <span>{rejectedDoc.name}</span>
      <span>Estado:</span>
      <span>{rejectedDoc.status}</span>
      <span>Url:</span>
      <span>{rejectedDoc.url}</span>
      <span>Creado por:</span>
      <span>{rejectedDoc.createdBy?.name}</span>
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
          newDocumentVersion(rejectedDoc);
        }}
      >
        Mandar documento a revision
      </button>
    </div>
  );
};

export default Rejected;
