import {
  FiCreditCard,
  FiFileText,
  FiMessageCircle,
  FiShoppingCart,
  FiGrid,
  FiUser,
  FiLogOut,
} from 'react-icons/fi';

import { NavItem } from 'components';
import { Roles } from 'types';

const links = {
  dahsboard: {
    to: '/dashboard',
    icon: FiGrid,
    label: 'Dashboard',
  },

  permissions: {
    to: '/permissions',
    icon: FiCreditCard,
    label: 'Permissões',
  },

  messages: {
    to: '/messages',
    icon: FiMessageCircle,
    label: 'Mensagens',
    roles: [Roles.ADMIN, Roles.MARKETING, Roles.SUPPORT],
  },

  posts: {
    to: '/posts',
    icon: FiFileText,
    label: 'Publicações',
    roles: [Roles.ADMIN, Roles.EDITOR],
  },

  sales: {
    to: '/sales',
    icon: FiShoppingCart,
    label: 'Vendas',
    roles: [Roles.ADMIN, Roles.MARKETING],
  },

  profile: {
    to: '/profile',
    icon: FiUser,
    label: 'Perfil',
  },

  logout: {
    to: '?logout=true',
    icon: FiLogOut,
    label: 'Sair',
    hoverColor: 'red.300',
  },
};

type UseNavLinksRequiredLinks = (keyof typeof links)[];

type UseNavLinksOptions = {
  showLabel?: boolean;
};

const useNavLinks = (
  requiredLinks: UseNavLinksRequiredLinks,
  { showLabel = true }: UseNavLinksOptions = {}
) => {
  const results = requiredLinks.map(label => links[label]);

  return (
    <>
      {results.map(props => (
        <NavItem key={props.to} {...props} showLabel={showLabel} />
      ))}
    </>
  );
};

export { useNavLinks };
