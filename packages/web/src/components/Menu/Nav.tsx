import Link from 'next/link';
import { FiAperture } from 'react-icons/fi';

import { useNavLinks } from 'hooks';
import { Drawer } from './Drawer';

import * as C from '@chakra-ui/react';

const Nav = () => {
  return (
    <C.Box>
      <C.Flex align="center" h="100%" display={['none', 'flex']}>
        <Link href="/dashboard" passHref>
          <a>
            <C.Icon as={FiAperture} color="teal.500" w="40px" h="40px" />
          </a>
        </Link>

        <C.Divider
          orientation="horizontal"
          h="100%"
          w="2px"
          mx="4"
          bg="gray.200"
        />

        <C.HStack spacing="4">
          {useNavLinks(['permissions', 'messages', 'posts', 'sales'], {
            showLabel: false,
          })}
        </C.HStack>
      </C.Flex>

      <Drawer />
    </C.Box>
  );
};

export { Nav };
