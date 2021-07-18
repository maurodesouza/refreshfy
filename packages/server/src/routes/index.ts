import { Router } from 'express';

import { users } from '../database';

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

export { routes };
