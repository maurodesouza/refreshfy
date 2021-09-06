import * as C from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Menu } from '.';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { asPath } = useRouter();

  const isLoginPage = asPath === '/';

  return isLoginPage ? (
    <>{children}</>
  ) : (
    <C.Center py={[5, '70px']}>
      <C.Box w="100%" maxW="600px" h="100%">
        <C.Box mb="4" p="4" borderRadius="8" boxShadow="xs">
          <Menu />
        </C.Box>

        <C.Box borderRadius="8" boxShadow="xs" p="4">
          {children}
        </C.Box>
      </C.Box>
    </C.Center>
  );
};

export { Layout };
