import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import { AuthContextProvider } from 'contexts/Auth';
import { theme } from 'styles/theme/default';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </ChakraProvider>
  );
};

export default App;
