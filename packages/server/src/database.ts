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
