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
    <div className='pplContainers flex flex-col'>
      <div className='flex flex-col md:flex-row p-2'>
        <Image
          alt='user Profile'
          src={data.getProfiles[0].customImage || session.user.image}
          width='100'
          height='100'
          className='rounded-full w-1/3'
        />
        <div className='grid grid-cols-2 gap-2 p-5'>
          <span className='text-[#306D81] font-bold'>Nombre:</span>
          <span>{data.getProfiles[0].customName}</span>
          <span className='text-[#306D81] font-bold'>Identificacion:</span>
          <span>{data.getProfiles[0].identification}</span>
          <span className='text-[#306D81] font-bold'>Direccion:</span>
          <span>{data.getProfiles[0].location}</span>
          <span className='text-[#306D81] font-bold'>Celular:</span>
          <span>{data.getProfiles[0].phone}</span>
        </div>
      </div>
      <div className='flex flex-col md:flex-row text-center w-full place-content-center'>
        <PrivateComponent roleList={['Admin']}>
          <Link href='/document/type'>
            <div className='pplButtons my-3'>Crear tipo de documento</div>
          </Link>
          <Link href='/document/pending'>
            <div className='pplButtons my-3'>Documentos pendientes</div>
          </Link>
        </PrivateComponent>
      </div>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <div className='pplTitles'>Actualizar información</div>
        <label className='pplLabels' htmlFor='name'>
          <span className='pplSpanLabels'>Nombre: </span>
          <input
            className='pplInputTxt'
            name='name'
            defaultValue={data.getProfiles[0].customName}
          />
        </label>
        <label className='pplLabels' htmlFor='location'>
          <span className='pplSpanLabels'>Direccion: </span>
          <input
            className='pplInputTxt'
            name='location'
            defaultValue={data.getProfiles[0].location}
          />
        </label>
        <label className='pplLabels' htmlFor='phone'>
          <span className='pplSpanLabels'>Celular: </span>
          <input
            className='pplInputTxt'
            name='phone'
            defaultValue={data.getProfiles[0].phone}
          />
        </label>
        <label className='pplLabels' htmlFor='identification'>
          <span className='pplSpanLabels'>Identificacion: </span>
          <input
            className='pplInputTxt'
            name='identification'
            defaultValue={data.getProfiles[0].identification}
          />
        </label>
        <input name='image' value={template} readOnly hidden />
        <input name='id' value={session.user.id} readOnly hidden />
        <div className='flex flex-col lg:flex-row my-5'>
          <FileUpload
            folder='document'
            resourceType='auto'
            text='Subir archivo'
            successCallBack={successCallBack}
            failureCallBack={failureCallBack}
          />
          <button className='pplButtons m-2' type='submit'>
            Actualizar perfil
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
