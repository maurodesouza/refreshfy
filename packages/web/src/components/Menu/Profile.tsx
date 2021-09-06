import * as C from '@chakra-ui/react';
import { ClientSideOnly } from 'components';

import { Popover } from './Popover';

const Profile = () => {
  return (
    <C.Flex align="center">
      <C.Flex mr="4" flexDir="column" display={['none', 'flex']}>
        <C.Text as="strong" fontSize="14">
          Mauro de Souza
        </C.Text>
        <C.Text as="strong" fontSize="10" color="gray.400">
          Admin
        </C.Text>
      </C.Flex>

      <ClientSideOnly>
        <Popover />
      </ClientSideOnly>
    </C.Flex>
  );
};

export { Profile };
