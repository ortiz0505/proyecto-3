import React, { useEffect, useState } from 'react';
import { GET_DOCUMENT_TYPE } from 'graphql/queries/document-type';
import { matchRoles } from 'utils/matchRoles';
import { useQuery } from '@apollo/client';
import Loading from '@components/Loading';
import PrivateComponent from '@components/PrivateComponent';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { GET_CHART } from 'graphql/queries/chart';
// import ReactApexChart from 'react-apexcharts';

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
  }, [dataChart, options]);

  if (loading || loadingChart) return <Loading />;
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
      <div id='chart'>
        <ReactApexChart
          options={options}
          series={series}
          type='pie'
          width={380}
        />
      </div>
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
