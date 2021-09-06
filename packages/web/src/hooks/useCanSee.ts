import { useAuth } from 'hooks';
import { Roles } from 'types';
import { validateUserPermission } from 'utils';

const useCanSee = (roles: Roles[] = []) => {
  const { user } = useAuth();

  return validateUserPermission(roles, user?.roles || []);
};

export { useCanSee };
