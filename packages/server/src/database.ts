import { RefreshTokensStore, UsersStore } from './types';
import { v4 as uuid } from 'uuid';

export const users: UsersStore = new Map();

export const tokens: RefreshTokensStore = new Map();

export const createRefreshToken = (email: string) => {
  const currentUserTokens = tokens.get(email) ?? [];
  const refreshToken = uuid();

  tokens.set(email, [...currentUserTokens, refreshToken]);

  return refreshToken;
};

export const checkRefreshTokenIsValid = (
  email: string,
  refreshToken: string
) => {
  const storedRefreshTokens = tokens.get(email) ?? [];

  return storedRefreshTokens.includes(refreshToken);
};

export const invalidateRefreshToken = (email: string, refreshToken: string) => {
  const storedRefreshTokens = tokens.get(email) ?? [];

  tokens.set(
    email,
    storedRefreshTokens.filter(token => token !== refreshToken)
  );
};
