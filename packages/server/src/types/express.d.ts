type UserPayload = {
  email: string;
  roles: import('./').Roles[];
};
declare namespace Express {
  export interface Request {
    user: UserPayload;
  }
}
