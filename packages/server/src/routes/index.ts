import { Router } from 'express';

import {
  isAuthenticatedMiddleware,
  hasPermissionMiddleware,
  addUserInformationToRequestMiddleware,
} from '../middlewares';
import * as refreshTokenSevices from '../services/refreshToken';

import { users, posts, messages, sales } from '../database';

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

routes.use(addUserInformationToRequestMiddleware);

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

routes.use(isAuthenticatedMiddleware);

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
    const { page = 1, per_page = 15 } = request.query;

    const formatedPosts = formatObjectMap(posts, 'id');

    const result = formatedPosts.slice(
      (Number(page) - 1) * Number(per_page),
      Number(page) * Number(per_page)
    );

    return response.json({
      items: result,
      total_pages: Math.ceil(formatedPosts.length / Number(per_page)),
    });
  }
);

routes.get(
  '/messages',
  hasPermissionMiddleware([Roles.ADMIN, Roles.SUPPORT, Roles.MARKETING]),
  (request, response) => {
    const { page = 1, per_page = 15 } = request.query;

    const formatedMessages = formatObjectMap(messages, 'id');

    const result = formatedMessages.slice(
      (Number(page) - 1) * Number(per_page),
      Number(page) * Number(per_page)
    );

    return response.json({
      items: result,
      total_pages: Math.ceil(formatedMessages.length / Number(per_page)),
    });
  }
);

routes.get(
  '/sales',
  hasPermissionMiddleware([Roles.ADMIN]),
  (request, response) => {
    const { page = 1, per_page = 15 } = request.query;

    const formatedSales = formatObjectMap(sales, 'id');

    const result = formatedSales.slice(
      (Number(page) - 1) * Number(per_page),
      Number(page) * Number(per_page)
    );

    return response.json({
      items: result,
      total_pages: Math.ceil(formatedSales.length / Number(per_page)),
    });
  }
);

export { routes };
