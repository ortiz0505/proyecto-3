import { gql } from 'apollo-server-micro';

const ChartTypes = gql`
  type Chart {
    labels: [String]
    series: [Int]
  }

  type Query {
    getChartOptions: Chart
  }
`;

export { ChartTypes };
