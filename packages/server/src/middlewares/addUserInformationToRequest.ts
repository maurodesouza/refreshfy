import { NextFunction, Request, Response } from 'express';
import { decode } from 'jsonwebtoken';

import { DecodedToken } from '../types';
import { users } from '../database';

const addUserInformationToRequestMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'O token de autenticação não foi enviado junto da requisição.',
    });
  }

  const [, token] = authorization?.split(' ');

  if (!token) {
    return response.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'O token de autenticação não foi enviado junto da requisição.',
    });
  }

  try {
    const { sub: email } = decode(token as string) as DecodedToken;

    const user = users.get(email);

    if (!user) {
      return response.status(400).json({
        error: true,
        code: 'token.invalid',
        message: 'O usuário contido no token esta inválido.',
      });
    }

    request.user = {
      email,
      roles: user.roles,
    };

    return next();
  } catch (err) {
    return response.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Token possuí formato inválido',
    });
  }
};

export { addUserInformationToRequestMiddleware };
