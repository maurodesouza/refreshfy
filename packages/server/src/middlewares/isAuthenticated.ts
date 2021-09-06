import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { DecodedToken } from '../types';
import { auth } from '../config';

const isAuthenticatedMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { authorization } = request.headers;

  const [, token] = authorization!.split(' ');

  try {
    jwt.verify(token as string, auth.secret) as DecodedToken;

    return next();
  } catch (err) {
    return response
      .status(401)
      .json({ error: true, code: 'token.expired', message: 'Token expirado' });
  }
};

export { isAuthenticatedMiddleware };
