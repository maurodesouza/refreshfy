import { GetServerSidePropsContext } from 'next';
import Router from 'next/router';

import axios, { AxiosError } from 'axios';
import { setCookie, parseCookies, destroyCookie } from 'nookies';

import { RefreshTokenResponseData } from 'types/api';
import { AuthTokenError } from '.';

type FailedRequest = {
  onSuccess: (token: string) => void;
  onFailure: (error: Error) => void;
};

let isRefreshingToken = false;
let failedRequestsQueue: FailedRequest[] = [];

export const setupApiClient = (
  context: GetServerSidePropsContext = undefined
) => {
  const cookies = parseCookies(context);

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      authorization: `Bearer ${cookies['@refreshfy:token']}`,
    },
  });

  api.interceptors.response.use(
    r => r,
    (error: AxiosError) => {
      if (error.response.status === 401) {
        if (error.response.data?.code === 'token.expired') {
          const { '@refreshfy:refreshToken': refreshToken } =
            parseCookies(context);

          if (!isRefreshingToken) {
            isRefreshingToken = true;

            api
              .post<RefreshTokenResponseData>('refresh', {
                refreshToken,
              })
              .then(({ data }) => {
                const { token, refreshToken: newRefreshToken } = data;

                const config = {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: '/',
                };

                setCookie(context, '@refreshfy:token', token, config);
                setCookie(
                  context,
                  '@refreshfy:refreshToken',
                  newRefreshToken,
                  config
                );

                api.defaults.headers['authorization'] = `Bearer ${token}`;

                failedRequestsQueue.forEach(request =>
                  request.onSuccess(token)
                );
              })
              .catch(() => {
                /* Do nothing! */
              })
              .finally(() => {
                isRefreshingToken = false;
                failedRequestsQueue = [];
              });
          }

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                const originalConfig = error.config;

                originalConfig.headers['authorization'] = `Bearer ${token}`;

                resolve(api(originalConfig));
              },

              onFailure: err => reject(err),
            });
          });
        } else {
          destroyCookie(context, '@refreshfy:token');
          destroyCookie(context, '@refreshfy:refreshToken');

          if (process.browser) Router.push('/');
          else {
            const request = failedRequestsQueue[0];

            request.onFailure(new AuthTokenError());
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
};
