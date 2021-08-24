import { useEffect } from 'react';

import { asLogged } from 'auth/asLogged';
import { useAuth } from 'hooks';

import { api } from 'services/api';

const Dashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    api
      .get('metrics')
      .then(r => console.log('Dashboard', r.data))
      .catch(err => console.error('Dashboard error', err));
  }, []);

  return <h1>Dashboard: {user?.email}</h1>;
};

export default Dashboard;

export const getServerSideProps = asLogged(async () => {
  return {
    props: {},
  };
});
