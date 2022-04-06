import { gql } from '@apollo/client';

const GET_CHART = gql`
  query Query {
    getChartOptions {
      labels
      series
    }
  }
`;

export { GET_CHART };
