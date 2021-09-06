import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { AxiosInstance } from 'axios';

import { destroyCookie, parseCookies } from 'nookies';
import decode from 'jwt-decode';

import { Roles } from 'types';

import { setupApiClient, AuthTokenError } from 'services/api';
import { validateUserPermission } from 'utils';

type FnArgs = {
  context: GetServerSidePropsContext;
  server: AxiosInstance;
};

export const asLogged = <P>(
  fn: (args: FnArgs) => Promise<GetServerSidePropsResult<P>>,
  roles?: Roles[]
) => {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(context);
    const token = cookies['@refreshfy:token'];

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    if (roles && roles.length) {
      const { roles: userRoles } = decode<{ roles: Roles[] }>(token);

      if (!validateUserPermission(roles, userRoles)) {
        return {
          redirect: {
            destination: '/dashboard',
            permanent: false,
          },
        };
      }
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
