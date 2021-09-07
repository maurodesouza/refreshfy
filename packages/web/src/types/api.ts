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

export type PostData = {
  title: string;
  id: string;
};

export type MessageData = {
  message: string;
  id: string;
};

export type PostResponseData = {
  items: PostData[];
  total_pages: number;
};

export type GetResponseData<T extends Record<string, unknown>> = {
  items: T[];
  total_pages: number;
};
