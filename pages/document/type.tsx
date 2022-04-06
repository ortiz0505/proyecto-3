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
  const failureCallBack = () => {
    toast.error('Error al cargar el archivo');
  };
  return (
    <div className='pplContainers'>
      <div className='pplTitles text-center md:text-left'>
        Nuevo tipo de documento
      </div>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <div className='flex flex-col md:flex-row'>
          <label htmlFor='name' className='pplLabels'>
            <span className='pplSpanLabels'>Nombre del tipo de documento</span>
            <input
              type='text'
              name='name'
              className='pplInputTxt'
              placeholder='Ingrese el tipo de documento'
              required
            />
          </label>
          <label htmlFor='format' className='pplLabels'>
            <span className='pplSpanLabels'>Formato</span>
            <input
              type='text'
              name='format'
              className='pplInputTxt'
              placeholder='Ingrese el formato'
              required
            />
          </label>
          <label htmlFor='template' className='pplLabels'>
            <span className='pplSpanLabels'>Plantilla</span>
            <input
              type='text'
              name='template'
              className='pplInputTxt'
              readOnly
              defaultValue={templateName}
              required
            />
          </label>
        </div>
        <div className='flex flex-col lg:flex-row my-5'>
          <FileUpload
            folder='document-type'
            resourceType='auto'
            text='Subir archivo'
            successCallBack={successCallBack}
            failureCallBack={failureCallBack}
          />
          <button type='submit' className='pplButtons m-2'>
            Crear tipo documento
          </button>
        </div>
      </form>
    </div>
  );
};

export default DocumentType;
