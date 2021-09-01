import { v4 as uuid } from 'uuid';
import { tokens } from '../database';

export const create = (email: string) => {
  const currentUserTokens = tokens.get(email) ?? [];
  const refreshToken = uuid();

  tokens.set(email, [...currentUserTokens, refreshToken]);

  return refreshToken;
};

export const IsValid = (email: string, refreshToken: string) => {
  const storedRefreshTokens = tokens.get(email) ?? [];

  return storedRefreshTokens.includes(refreshToken);
};

export const invalidate = (email: string, refreshToken: string) => {
  const storedRefreshTokens = tokens.get(email) ?? [];

  tokens.set(
    email,
    storedRefreshTokens.filter(token => token !== refreshToken)
  );
};
