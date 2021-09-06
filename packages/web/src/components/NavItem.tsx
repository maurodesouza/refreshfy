import Link from 'next/link';
import * as C from '@chakra-ui/react';

import { useRouter } from 'next/router';
import { IconType } from 'react-icons';

import { ClientSideOnly } from '.';
import { useCanSee } from 'hooks';

import { Roles } from 'types';

type NavItemProps = {
  icon: IconType;
  label: string;
  showLabel?: boolean;
  to: string;
  hoverColor?: string;
  roles?: Roles[];
};

const NavItem = ({
  icon,
  label,
  hoverColor,
  showLabel = true,
  to,
  roles,
}: NavItemProps) => {
  const { asPath } = useRouter();

  const hasPermission = useCanSee(roles);
  const isActive = asPath === to;

  const color = isActive ? 'teal.500' : 'gray.300';
  const colorHover = hasPermission ? hoverColor || 'teal.500' : 'red.300';

  return (
    <ClientSideOnly>
      <Link href={hasPermission ? to : ''} passHref>
        <a>
          <C.Tooltip
            label={hasPermission ? label : 'Você não possui permissão!'}
          >
            <C.Flex color={color} _hover={{ color: colorHover }}>
              <C.Box>
                <C.Icon as={icon} color="inherit" w="24px" h="24px" />
              </C.Box>

              {showLabel && (
                <C.Text ml="4" color="inherit">
                  {label}
                </C.Text>
              )}
            </C.Flex>
          </C.Tooltip>
        </a>
      </Link>
    </ClientSideOnly>
  );
};

export default NavItem;
