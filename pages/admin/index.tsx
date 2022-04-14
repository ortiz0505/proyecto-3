import { useMutation, useQuery } from '@apollo/client';
import Lod from '@components/Lod';
import { Dialog } from '@mui/material';
import { UPDATE_USER } from 'graphql/mutations/user';
import { GET_USERS } from 'graphql/queries/user';
import React, { useState } from 'react';
import { matchRoles } from 'utils/matchRoles';

export const getServerSideProps = async (context) => ({
  props: { ...(await matchRoles(context)) },
});

const IndexAdmin = () => {
  const { data, loading } = useQuery(GET_USERS, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Lod />;

  return (
    <div className='pplContainers'>
      <div className='pplTitles'>Lista de usuarios</div>
      <div className='overflow-x-auto shadow-lg rounded-lg'>
        <table className='w-full text-left text-gray-500 rounded-lg'>
          <thead className='text-sm bg-[#306D81] text-[#E6F4F1]'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Nombre
              </th>
              <th scope='col' className='px-6 py-3'>
                Email
              </th>
              <th scope='col' className='px-6 py-3'>
                Rol
              </th>
              <th scope='col' className='px-6 py-3'>
                .
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.getUsers.map((user) => (
              <ListUsers key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ListUsers = ({ user }) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const closeDialog = () => {
    setOpenEditDialog(false);
  };
  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [GET_USERS],
  });
  const adminRole = async (e) => {
    await updateUser({
      variables: {
        where: {
          id: e.id,
        },
        data: {
          roleId: {
            set: 'cl1mx8t510070o8w25nzf2jzb',
          },
        },
      },
    });
  };
  const developerRole = async (e) => {
    await updateUser({
      variables: {
        where: {
          id: e.id,
        },
        data: {
          roleId: {
            set: 'cl1mx8t510074o8w28oa50ck7',
          },
        },
      },
    });
  };
  const documenterRole = async (e) => {
    await updateUser({
      variables: {
        where: {
          id: e.id,
        },
        data: {
          roleId: {
            set: 'cl1mx8t510072o8w2o0vxcv2x',
          },
        },
      },
    });
  };
  return (
    <tr className='bg-[#E6F4F1]'>
      <th scope='row' className='px-6 py-4 font-medium'>
        {user.name}
      </th>
      <td className='px-6 py-4'>{user.email}</td>
      <td className='px-6 py-4'>{user.role.name}</td>
      <button
        type='button'
        className='px-6 py-4 text-right hover:text-black cursor-pointer'
        onClick={() => setOpenEditDialog(true)}
      >
        Editar rol
      </button>
      <Dialog open={openEditDialog} onClose={closeDialog}>
        <button
          type='button'
          onClick={() => {
            adminRole(user);
          }}
        >
          Cambiar a Admin
        </button>
        <button
          type='button'
          onClick={() => {
            developerRole(user);
          }}
        >
          Cambiar a Developer
        </button>
        <button
          type='button'
          onClick={() => {
            documenterRole(user);
          }}
        >
          Cambiar a Documenter
        </button>
      </Dialog>
    </tr>
  );
};

export default IndexAdmin;
