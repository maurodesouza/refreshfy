import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { useToast } from '@chakra-ui/react';

import { SessionsResponseData, MeResponseData } from 'types/api';
import { api } from 'services/api';

type User = {
  email: string;
  roles: string[];
  permissions: string[];
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  const toast = useToast();
  const router = useRouter();

  const signIn = async ({ email, password }: SignInCredentials) => {
    try {
      const { data } = await api.post<SessionsResponseData>('sessions', {
        email,
        password,
      });

      const { roles, permissions, token, refreshToken } = data;

      setUser({
        email,
        roles,
        permissions,
      });

      const config = {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      };

      setCookie(undefined, '@refreshfy:token', token, config);
      setCookie(undefined, '@refreshfy:refreshToken', refreshToken, config);

      api.defaults.headers['authorization'] = `Bearer ${token}`;

      router.push('/dashboard');
    } catch (err) {
      const title = err.response?.data?.message || 'Ocorreu um erro';

      toast.closeAll();
      toast({ title, status: 'error' });

      throw new Error(err);
    }
  };

  const signOut = () => {
    destroyCookie(undefined, '@refreshfy:token');
    destroyCookie(undefined, '@refreshfy:refreshToken');

    router.push('/');
  };

  const getUserData = async () => {
    try {
      const { data } = await api.get<MeResponseData>('me');

      const { email, permissions, roles } = data;

      setUser({ email, permissions, roles });
    } catch (err) {
      console.error('Catch do getUserData');

      destroyCookie(undefined, '@refreshfy:token');
      destroyCookie(undefined, '@refreshfy:refreshToken');

      router.push('/');
    }
  };

  useEffect(() => {
    const { '@refreshfy:token': token } = parseCookies();

    if (token) getUserData();
  }, []);

  useEffect(() => {
    const { logout } = router.query;

    if (logout === 'true') signOut();
  }, [router.query]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
