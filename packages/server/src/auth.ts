import jwt from 'jsonwebtoken';

import { auth } from './config';
import * as refreshTokenSevices from './services/refreshToken';

export function generateJwtAndRefreshToken(
  email: string,
  payload: Record<string, unknown> = {}
) {
  const token = jwt.sign(payload, auth.secret, {
    subject: email,
    expiresIn: 10,
  });

  const refreshToken = refreshTokenSevices.create(email);

  return {
    token,
    refreshToken,
  };
}
