import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { AxiosInstance } from 'axios';

import { destroyCookie, parseCookies } from 'nookies';

import { setupApiClient, AuthTokenError } from 'services/api';

type FnArgs = {
  context: GetServerSidePropsContext;
  server: AxiosInstance;
};

export const asLogged = <P>(
  fn: (args: FnArgs) => Promise<GetServerSidePropsResult<P>>
) => {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(context);

    if (!cookies['@refreshfy:token']) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    const server = setupApiClient(context);

    try {
      return await fn({ context, server });
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(context, '@refreshfy:token');
        destroyCookie(context, '@refreshfy:refreshToken');

        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
    }
  };
};
