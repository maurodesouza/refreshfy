import { Router } from 'express';

import {
  isAuthenticatedMiddleware,
  hasPermissionMiddleware,
} from '../middlewares';
import * as refreshTokenSevices from '../services/refreshToken';

import { users, posts } from '../database';

import { CreateSessionDTO, Roles } from '../types';
import { generateJwtAndRefreshToken } from '../auth';
import { formatObjectMap } from '../utils/formtatObjectMap';

const routes = Router();

routes.post('/sessions', (request, response) => {
  const { email, password } = request.body as CreateSessionDTO;

  const user = users.get(email);

  if (!user || password !== user.password) {
    return response.status(401).json({
      error: true,
      code: 'session.create',
      message: 'Email ou senha estão incorretos!',
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

routes.use(isAuthenticatedMiddleware);

routes.post('/refresh', (request, response) => {
  const { email } = request.user;
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

  const isValidRefreshToken = refreshTokenSevices.IsValid(email, refreshToken);

  if (!isValidRefreshToken) {
    return response
      .status(401)
      .json({ error: true, message: 'Refresh token is invalid.' });
  }

  refreshTokenSevices.invalidate(email, refreshToken);

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

routes.get('/me', (request, response) => {
  const { email } = request.user;

  const user = users.get(email);

  if (!user) {
    return response
      .status(400)
      .json({ error: true, message: 'User not found.' });
  }

  return response.json({
    email,
    permissions: user.permissions,
    roles: user.roles,
  });
});

routes.get(
  '/posts',
  hasPermissionMiddleware([Roles.ADMIN, Roles.EDITOR]),
  (request, response) => {
    return response.json(formatObjectMap(posts, 'id'));
  }
);

export { routes };
