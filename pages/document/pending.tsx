import { useQuery } from '@apollo/client';
import Loading from '@components/Loading';
import { GET_PENDING_DOCUMENT } from 'graphql/queries/document';
import React from 'react';
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
    <div className='flex flex-col items-center p-10'>
      <h2 className='my-4 text-3xl font-bold text-gray-800'>
        Documentos pendientes
      </h2>
      <div className='hidden lg:block'>
        <table>
          <thead>
            <th>Nombre</th>
            <th> </th>
            <th>Plantilla</th>
            <th> </th>
            <th>Creador</th>
            <th>Fecha de Creación</th>
          </thead>
          <tbody>
            {data?.getPendingDocument.map((doc) => (
              <PendingDocument key={doc.id} pendingDoc={doc} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PendingDocument = ({ pendingDoc }) => (
  <tr>
    <td>{pendingDoc.name}</td>
    <td> ♥ </td>
    <td>{pendingDoc.typeDocument.name}</td>
    <td> ♥ </td>
    <td>{pendingDoc.createdBy.name}</td>
    <td>{pendingDoc.createdAt}</td>
  </tr>
);

export default Pending;
