import { createContext, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { parseCookies, setCookie, destroyCookie } from 'nookies';

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
  isAuthenticated: boolean;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  const router = useRouter();

  const signIn = useCallback(
    async ({ email, password }: SignInCredentials) => {
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
        // Do nothing!
      }
    },
    [router]
  );

  const getUserData = useCallback(async () => {
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
  }, [router]);

  useEffect(() => {
    const { '@refreshfy:token': token } = parseCookies();

    if (token) getUserData();
  }, [getUserData]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
