import prisma from 'config/prisma';

const ChartResolvers = {
  Query: {
    getChartOptions: async (parents, args) => {
      const data: [any] = await prisma.$queryRaw`
        select 
        count(status),
        status 
        from "Document" 
        group by status `;

      const series: any = data.map((s) => {
        return s.count;
      });
      const labels: any = data.map((s) => {
        return s.status;
      });
      return {
        series,
        labels,
      };
    },
  },
};

export { ChartResolvers };
