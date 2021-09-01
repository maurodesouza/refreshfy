import { NextFunction, Request, Response } from 'express';
import { Roles } from '../types';

const hasPermissionMiddleware = (roles: Roles[]) => {
  return (request: Request, response: Response, next: NextFunction) => {
    const { roles: userRoles } = request.user;

    const hasPermission = userRoles.some(role => roles.includes(role));

    if (!hasPermission) {
      return response.status(403).json({
        error: true,
        code: 'permission.denied',
        message: 'Você não possui permissão para acessar esse serviço',
      });
    }

    next();
  };
};

export { hasPermissionMiddleware };
