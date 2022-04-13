import { useQuery } from '@apollo/client';
import Loading from '@components/Loading';
import { GET_USERS } from 'graphql/queries/user';
import React from 'react';
import { matchRoles } from 'utils/matchRoles';

export const getServerSideProps = async (context) => ({
  props: { ...(await matchRoles(context)) },
});

const IndexAdmin = () => {
  const { data, loading } = useQuery(GET_USERS, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Loading />;

  return (
    <div>
      <div>Lista de usuarios</div>
      <div className='flex flex-col md:flex-row'>
        {data?.getUsers.map((user) => (
          <ListUsers key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

const ListUsers = ({ user }) => {
  return (
    <div className='flex flex-col'>
      <span>Nombre:</span>
      <span>{user.name}:</span>
      <span>Email:</span>
      <span>{user.email}</span>
      <span>Rol:</span>
      <span>{user.role.name}</span>
      <button type='button'>Editar rol</button>
    </div>
  );
};

export default IndexAdmin;
