import jwt from 'jsonwebtoken';

import { auth } from './config';
import { createRefreshToken } from './database';

export function generateJwtAndRefreshToken(
  email: string,
  payload: Record<string, unknown> = {}
) {
  const token = jwt.sign(payload, auth.secret, {
    subject: email,
    expiresIn: 10,
  });

  const refreshToken = createRefreshToken(email);

  return {
    token,
    refreshToken,
  };
}
