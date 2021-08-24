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
  },

  posts: {
    to: '/posts',
    icon: FiFileText,
    label: 'Publicações',
  },

  sales: {
    to: '/sales',
    icon: FiShoppingCart,
    label: 'Vendas',
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
