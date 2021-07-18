export type SessionsResponseData = {
  permissions: string[];
  roles: string[];
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
