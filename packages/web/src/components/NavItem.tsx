import Link from 'next/link';
import { IconType } from 'react-icons';

import * as C from '@chakra-ui/react';
import { useRouter } from 'next/router';

type NavItemProps = {
  icon: IconType;
  label: string;
  showLabel?: boolean;
  to: string;
};

const NavItem = ({ icon, label, showLabel = true, to }: NavItemProps) => {
  const { asPath } = useRouter();

  const isActive = asPath === to;
  const color = isActive ? 'teal.500' : 'gray.300';

  return (
    <Link href={to} passHref>
      <a>
        <C.Tooltip label={label}>
          <C.Flex color={color}>
            <C.Box>
              <C.Icon
                as={icon}
                color="inherit"
                _hover={{ color: 'teal.500' }}
                w="24px"
                h="24px"
              />
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
  );
};

export default NavItem;
