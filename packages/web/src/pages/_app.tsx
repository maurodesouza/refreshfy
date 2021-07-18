import 'styles/global.css';

import { AppProps } from 'next/app';

import { AuthContextProvider } from 'contexts/Auth';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
};

export default App;
