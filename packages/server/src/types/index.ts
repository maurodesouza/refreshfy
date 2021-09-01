import * as database from '../database';

export enum Roles {
  ADMIN,
  SUPPORT,
  EDITOR,
  MARKETING,
}

export type CreateSessionDTO = {
  email: string;
  password: string;
};

type UserData = {
  password: string;
  permissions: string[];
  roles: Roles[];
};

export type UsersStore = Map<string, UserData>;

export type RefreshTokensStore = Map<string, string[]>;

type DatabaseStores = keyof typeof database;

export type Database<Store extends DatabaseStores> = Record<
  DatabaseStores,
  typeof database[Store]
>;

export type DecodedToken = {
  sub: string;
};
