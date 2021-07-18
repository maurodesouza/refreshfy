class AuthTokenError extends Error {
  constructor() {
    super('Auth token error');
  }
}

export { AuthTokenError };
