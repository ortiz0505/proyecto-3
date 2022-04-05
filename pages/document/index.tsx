import React from 'react';
import { GET_DOCUMENT_TYPE } from 'graphql/queries/document-type';
import { matchRoles } from 'utils/matchRoles';
import { useQuery } from '@apollo/client';
import Loading from '@components/Loading';
import PrivateComponent from '@components/PrivateComponent';
import Link from 'next/link';

export const getServerSideProps = async (context) => ({
  props: { ...(await matchRoles(context)) },
});

const Index = () => {
  const { data, loading } = useQuery(GET_DOCUMENT_TYPE, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Loading />;
  return (
    <div className='flex flex-col items-center p-10'>
      <h2 className='my-4 text-3xl font-bold text-gray-800'>
        Tipos de documentos
      </h2>
      <div className='block'>
        <table>
          <thead>
            <PrivateComponent roleList={['Admin']}>
              <th>Id</th>
            </PrivateComponent>
            <th>Nombre</th>
            <th>Formato</th>
            <th>Plantilla</th>
          </thead>
          <tbody>
            {data.getTypeDocuments.map((tDoc) => (
              <DocumentType key={tDoc.id} TypeDocument={tDoc} />
            ))}
          </tbody>
        </table>
      </div>
      <Link href='/document/new' passHref>
        <button className='bg-orange-300' type='button'>
          Crear documento
        </button>
      </Link>
    </div>
  );
};

const DocumentType = ({ TypeDocument }) => (
  <tr>
    <PrivateComponent roleList={['Admin']}>
      <td>{TypeDocument.id}</td>
    </PrivateComponent>
    <td>{TypeDocument.name}</td>
    <td>{TypeDocument.format}</td>
    <td>
      <a target='_blank' rel='noreferrer' href={TypeDocument.template} download>
        Descargar
        <i className='fa-solid fa-file-arrow-down m-2'> </i>
      </a>
    </td>
  </tr>
);

export default Index;
