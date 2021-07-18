export type SessionsResponseData = {
  permissions: string[];
  roles: string[];
  token: string;
  refreshToken: string;
};

export type RefreshTokenResponseData = Pick<
  SessionsResponseData,
  'refreshToken' | 'token'
>;
