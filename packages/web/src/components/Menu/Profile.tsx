import * as C from '@chakra-ui/react';
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

      <Popover />
    </C.Flex>
  );
};

export { Profile };
