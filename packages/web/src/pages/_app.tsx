import 'config/yup';

import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import { AuthContextProvider } from 'contexts/Auth';
import { theme } from 'styles/theme/default';

import { Layout } from 'components';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </ChakraProvider>
  );
};

export default App;
