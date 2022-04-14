import { useMutation, useQuery } from '@apollo/client';
import FileUpload from '@components/FileUpload';
import Loading from '@components/Loading';
import PrivateComponent from '@components/PrivateComponent';
import { UPSERT_PROFILE } from 'graphql/mutations/profile';
import { GET_PROFILES } from 'graphql/queries/profile';
import useFormData from 'hooks/useFormData';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { matchRoles } from 'utils/matchRoles';

export const getServerSideProps = async (context) => ({
  props: { ...(await matchRoles(context)) },
});

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { data, loading } = useQuery(GET_PROFILES, {
    fetchPolicy: 'cache-and-network',
  });
  const [template, setTemplate] = useState();
  const successCallBack = (e) => {
    setTemplate(e.info.secure_url);
  };
  const { form, formData, updateFormData } = useFormData(null);
  const failureCallBack = () => {
    toast.error('Error al cargar el archivo');
  };
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await upProfile(formData);
      toast.success('perfil actualizado');
    } catch (error) {
      toast.error('algo salio mal');
    }
  };
  const [upsertProfile] = useMutation(UPSERT_PROFILE, {
    refetchQueries: [GET_PROFILES],
  });
  const upProfile = async (e) => {
    await upsertProfile({
      variables: {
        where: {
          id: data.getProfiles[0].id,
        },
        create: {
          customName: e.name ?? '',
          customImage: template ?? data.getProfiles[0].customImage,
          location: e.location ?? '',
          phone: e.phone ?? '',
          identification: e.identification ?? '',
          userId: e.id,
        },
        update: {
          customName: {
            set: e.name ?? '',
          },
          customImage: {
            set: template ?? data.getProfiles[0].customImage,
          },
          location: {
            set: e.location ?? '',
          },
          phone: {
            set: e.phone ?? '',
          },
          identification: {
            set: e.identification ?? '',
          },
        },
      },
    });
  };
  if (loading) return <Loading />;

  return (
    <div className='pplContainers flex flex-row'>
      <div className='flex flex-col p-2'>
        <Image
          alt='user Profile'
          src={data.getProfiles[0].customImage || session.user.image}
          width='100'
          height='100'
          className='rounded-full'
        />
        <span>Nombre: {data.getProfiles[0].customName}</span>
        <span>Identificacion: {data.getProfiles[0].identification}</span>
        <span>Direccion: {data.getProfiles[0].location}</span>
        <span>Celular: {data.getProfiles[0].phone}</span>
      </div>

      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <label htmlFor='name'>
          <span>Nombre: </span>
          <input name='name' defaultValue={data.getProfiles[0].customName} />
        </label>
        <label htmlFor='location'>
          <span>Direccion: </span>
          <input name='location' defaultValue={data.getProfiles[0].location} />
        </label>
        <label htmlFor='phone'>
          <span>Celular: </span>
          <input name='phone' defaultValue={data.getProfiles[0].phone} />
        </label>
        <label htmlFor='identification'>
          <span>Identificacion: </span>
          <input
            name='identification'
            defaultValue={data.getProfiles[0].identification}
          />
        </label>
        <input name='image' value={template} readOnly hidden />
        <input name='id' value={session.userId as string} readOnly hidden />
        <FileUpload
          folder='document'
          resourceType='auto'
          text='Subir archivo'
          successCallBack={successCallBack}
          failureCallBack={failureCallBack}
        />
        <button type='submit'> Actualizar perfil </button>
      </form>
      <PrivateComponent roleList={['Admin']}>
        <Link href='/document/type'>Crear tipo de documento</Link>
      </PrivateComponent>
    </div>
  );
};

export default Home;
