import { Roles } from 'types';

const validateUserPermission = (roles: Roles[] = [], userRoles: Roles[]) => {
  if (!roles.length) return true;
  else return roles.some(role => userRoles.includes(role));
};

export { validateUserPermission };
