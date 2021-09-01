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

export type DecodedToken = {
  sub: string;
};
