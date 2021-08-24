import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

import { asLogged } from 'auth/asLogged';
import { useAuth } from 'hooks';

const Dashboard = () => {
  const { user } = useAuth();
  const toast = useToast();

  useEffect(() => {
    toast.closeAll();
  }, [toast]);

  return <h1>Dashboard: {user?.email}</h1>;
};

export default Dashboard;

export const getServerSideProps = asLogged(async () => {
  return {
    props: {},
  };
});
