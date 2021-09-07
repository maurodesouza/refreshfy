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

type PostData = {
  title: string;
};

type MessageData = {
  message: string;
};

type SaleData = {
  product: string;
  price: number;
  client: string;
};

export type UsersStore = Map<string, UserData>;

export type PostsStore = Map<string, PostData>;

export type SalesStore = Map<string, SaleData>;

export type MessagesStore = Map<string, MessageData>;

export type RefreshTokensStore = Map<string, string[]>;

type DatabaseStores = keyof typeof database;

export type Database<Store extends DatabaseStores> = Record<
  DatabaseStores,
  typeof database[Store]
>;

export type DecodedToken = {
  sub: string;
};
