import { useMutation } from '@apollo/client';
import FileUpload from '@components/FileUpload';
import { CREATE_DOCUMENT_TYPE } from 'graphql/mutations/document-type';
import useFormData from 'hooks/useFormData';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { matchRoles } from 'utils/matchRoles';

export const getServerSideProps = async (context) => ({
  props: { ...(await matchRoles(context)) },
});

const DocumentType = () => {
  const [createDocumentType] = useMutation(CREATE_DOCUMENT_TYPE);
  const { form, formData, updateFormData } = useFormData(null);
  const [template, setTemplate] = useState();
  const [templateName, setTemplateName] = useState();

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await createDocumentType({
        variables: {
          data: {
            name: formData.name,
            format: formData.format,
            template,
          },
        },
      });
      toast.success('Tipo de documento creado');
    } catch (error) {
      toast.error('Archivo no seleccionado');
    }
  };

  const successCallBack = (e) => {
    setTemplate(e.info.secure_url);
    setTemplateName(e.info.original_filename);
  };
  const failureCallBack = (e) => {
    toast.error('Error al cargar el archivo');
  };
  return (
    <div>
      <h1>Tipo de documento</h1>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <label htmlFor='name'>
          <span>Nombre del tipo de documento</span>
          <input name='name' required />
        </label>
        <label htmlFor='format'>
          <span>Formato</span>
          <input name='format' required />
        </label>
        <span>template</span>
        <input readOnly defaultValue={templateName} required />
        <FileUpload
          folder='document-type'
          resourceType='auto'
          text='Subir archivo'
          successCallBack={successCallBack}
          failureCallBack={failureCallBack}
        />
        <button type='submit'>Crear tipo documento</button>
      </form>
    </div>
  );
};

export default DocumentType;
