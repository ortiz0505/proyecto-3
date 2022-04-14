/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { GET_DOCUMENT_TYPE } from 'graphql/queries/document-type';
import { matchRoles } from 'utils/matchRoles';
import { useQuery } from '@apollo/client';
import Loading from '@components/Loading';
import PrivateComponent from '@components/PrivateComponent';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { GET_CHART } from 'graphql/queries/chart';

const ReactApexChart = dynamic(
  () => {
    return import('react-apexcharts');
  },
  { ssr: false }
);

export const getServerSideProps = async (context) => ({
  props: { ...(await matchRoles(context)) },
});

const Index = () => {
  const { data, loading } = useQuery(GET_DOCUMENT_TYPE, {
    fetchPolicy: 'cache-and-network',
  });
  const { data: dataChart, loading: loadingChart } = useQuery(GET_CHART);
  const [options, setOptions] = useState<any>({
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: [],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  });
  const [series, setSeries] = useState<any>([]);

  useEffect(() => {
    if (dataChart) {
      setSeries(dataChart.getChartOptions.series);
      setOptions({ ...options, labels: dataChart.getChartOptions.labels });
    }
  }, [dataChart]);

  if (loading || loadingChart) return <Loading />;
  return (
    <div className='pplContainers'>
      <div className='flex flex-col md:flex-row md:justify-between'>
        <div className='pplTitles'>Tipos de documentos</div>
        <Link href='/document/new' passHref>
          <div className='flex items-center justify-center md:w-1/3 cursor-pointer pplButtons'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 fill-[#E6F4F1] mx-2'
              viewBox='0 0 20 20'
              fill='none'
            >
              <path
                fillRule='evenodd'
                d='M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z'
                clipRule='evenodd'
              />
            </svg>
            <div className='text-[#E6F4F1] mx-2'>Crear nuevo documento</div>
          </div>
        </Link>
      </div>
      <div className='flex flex-col md:flex-row'>
        {data.getTypeDocuments.map((tDoc) => (
          <DocumentType key={tDoc.id} TypeDocument={tDoc} />
        ))}
      </div>
      <div className='subContainers'>
        <div className='pplTitles text-center'>
          Cantidad de documentos por estado
        </div>
        <div className='flex justify-center' id='chart'>
          <ReactApexChart
            options={options}
            series={series}
            type='pie'
            width={380}
          />
        </div>
      </div>
    </div>
  );
};

const DocumentType = ({ TypeDocument }) => (
  <div className='cardBody'>
    <div className='cardTop'>
      <PrivateComponent roleList={['Admin']}>
        <span className='text-xs my-2'>ID: {TypeDocument.id}</span>
      </PrivateComponent>
      <span>Nombre: {TypeDocument.name}</span>
      <span>Formato: {TypeDocument.format}</span>
    </div>
    <div className='cardButton'>
      <a target='_blank' rel='noreferrer' href={TypeDocument.template} download>
        Descargar
        <i className='fa-solid fa-file-arrow-down m-2'> </i>
      </a>
    </div>
  </div>
);

export default Index;
