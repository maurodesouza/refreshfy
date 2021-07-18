import { Router } from 'express';

import { addUserInfoToRequest } from '../middlewares';

import {
  checkRefreshTokenIsValid,
  users,
  invalidateRefreshToken,
} from '../database';

import { CreateSessionDTO } from '../types';
import { generateJwtAndRefreshToken } from '../auth';

const routes = Router();

routes.post('/sessions', (request, response) => {
  const { email, password } = request.body as CreateSessionDTO;

  const user = users.get(email);

  if (!user || password !== user.password) {
    return response.status(401).json({
      error: true,
      message: 'E-mail or password incorrect.',
    });
  }

  const { permissions, roles } = user;

  const { token, refreshToken } = generateJwtAndRefreshToken(email, {
    permissions,
    roles,
  });

  return response.json({
    token,
    refreshToken,
    permissions,
    roles,
  });
});

routes.post('/refresh', addUserInfoToRequest, (request, response) => {
  const email = request.user;
  const { refreshToken } = request.body;

  const user = users.get(email);

  if (!user) {
    return response.status(401).json({
      error: true,
      message: 'User not found.',
    });
  }

  if (!refreshToken) {
    return response
      .status(401)
      .json({ error: true, message: 'Refresh token is required.' });
  }

  const isValidRefreshToken = checkRefreshTokenIsValid(email, refreshToken);

  if (!isValidRefreshToken) {
    return response
      .status(401)
      .json({ error: true, message: 'Refresh token is invalid.' });
  }

  invalidateRefreshToken(email, refreshToken);

  const { permissions, roles } = user;

  const { token, refreshToken: newRefreshToken } = generateJwtAndRefreshToken(
    email,
    {
      permissions,
      roles,
    }
  );

  return response.json({
    token,
    refreshToken: newRefreshToken,
    permissions,
    roles,
  });
});

export { routes };
