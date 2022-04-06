import { useMutation, useQuery } from '@apollo/client';
import { GET_DOCUMENT_TYPE } from 'graphql/queries/document-type';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { matchRoles } from 'utils/matchRoles';
import FileUpload from '@components/FileUpload';
import { toast } from 'react-toastify';
import { CREATE_DOCUMENT } from 'graphql/mutations/document';

export const getServerSideProps = async (context) => ({
  props: { ...(await matchRoles(context)) },
});

const NewDocument = () => {
  const { data } = useQuery(GET_DOCUMENT_TYPE, {
    fetchPolicy: 'cache-and-network',
  });
  const [createDocument] = useMutation(CREATE_DOCUMENT);
  const { data: session } = useSession();
  const [type, setType] = useState<String>();
  const [template, setTemplate] = useState();
  const [templateName, setTemplateName] = useState();
  const [name, setName] = useState<String>();
  const successCallBack = (e) => {
    setTemplate(e.info.secure_url);
    setTemplateName(e.info.original_filename);
  };
  const failureCallBack = () => {
    toast.error('Error al cargar el archivo');
  };
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await createDocument({
        variables: {
          data: {
            name,
            url: template,
            status: 'Pending',
            typeDocumentId: type,
            userId: session.user.id,
          },
        },
      });
      toast.success('Documento enviado para revision!');
    } catch (error) {
      toast.error('Archivo no seleccionado');
    }
  };
  return (
    <div>
      <form onSubmit={submitForm}>
        <label htmlFor='name'>
          <span>Nombre del documento: </span>
          <input
            name='name'
            placeholder='Certificado 00'
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
        <select
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <option value='no'>Selecione una opcion</option>
          {data?.getTypeDocuments?.map((tDoc) => (
            <OptionSelect key={tDoc.id} value={tDoc.id} name={tDoc.name} />
          ))}
        </select>
        {templateName !== undefined ? templateName : null}
        <FileUpload
          folder='document'
          resourceType='auto'
          text='Subir archivo'
          successCallBack={successCallBack}
          failureCallBack={failureCallBack}
        />
        <button type='submit'>Crear documento</button>
      </form>
    </div>
  );
};

const OptionSelect = ({ value, name }) => {
  return <option value={value}>{name}</option>;
};

export default NewDocument;
