import * as C from '@chakra-ui/react';

import { Profile } from './Profile';
import { Nav } from './Nav';

const Menu = () => {
  return (
    <C.Box>
      <C.Flex justify="space-between">
        <Nav />

        <Profile />
      </C.Flex>
    </C.Box>
  );
};

export { Menu };
