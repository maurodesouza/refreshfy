import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { FiChevronRight } from 'react-icons/fi';
import { useNavLinks } from 'hooks';

import * as C from '@chakra-ui/react';

const Drawer = () => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [router.asPath]);

  return (
    <>
      <C.IconButton
        aria-label="Abrir menu mobile"
        display={['inline-flex', 'none']}
        variant="unstyled"
        onClick={() => setIsDrawerOpen(true)}
      >
        <FiChevronRight />
      </C.IconButton>

      <C.Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        placement="left"
        size="xs"
      >
        <C.DrawerOverlay />
        <C.DrawerContent>
          <C.DrawerCloseButton />
          <C.DrawerHeader>Menu</C.DrawerHeader>
          <C.DrawerBody>
            <C.Stack spacing="4" mt="4">
              {useNavLinks([
                'dahsboard',
                'permissions',
                'messages',
                'posts',
                'sales',
              ])}
            </C.Stack>
          </C.DrawerBody>
        </C.DrawerContent>
      </C.Drawer>
    </>
  );
};

export { Drawer };
