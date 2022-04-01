import React from 'react';
import { matchRoles } from 'utils/matchRoles';

export const getServerSideProps = async (context) => ({
  props: { ...(await matchRoles(context)) },
});

const tipoDocumento = () => {
  return <div>tipoDocumento</div>;
};

export default tipoDocumento;
