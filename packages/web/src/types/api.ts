import { Roles } from 'types';

export type SessionsResponseData = {
  permissions: string[];
  roles: Roles[];
  token: string;
  refreshToken: string;
};

export type MeResponseData = Pick<
  SessionsResponseData,
  'permissions' | 'roles'
> & {
  email: string;
};

export type RefreshTokenResponseData = Pick<
  SessionsResponseData,
  'refreshToken' | 'token'
>;
