import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { DecodedToken } from '../types';
import { auth } from '../config';

const checkAuthMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Token not present.',
    });
  }

  const [, token] = authorization?.split(' ');

  if (!token) {
    return response.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Token not present.',
    });
  }

  try {
    const decoded = jwt.verify(token as string, auth.secret) as DecodedToken;

    request.user = decoded.sub;

    return next();
  } catch (err) {
    return response
      .status(401)
      .json({ error: true, code: 'token.expired', message: 'Token invalid.' });
  }
};

export { checkAuthMiddleware };
