import { useState, useEffect, useCallback } from 'react';
import { User } from '@/src/types';

type AuthToken = {
  accessToken: string;
  expiry: string;
};

type UseAuthReturnType = {
  user: User | null;
  isLoggedIn: boolean;
  error: string | null;
  loading: boolean;
  login: (email: string, password: string) => void;
  register: (email: string, password: string, name: string) => void;
};

const useAuth = (): UseAuthReturnType => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const tokenData = localStorage.getItem('token');

    if (userData && tokenData) {
      const userDetail: User = JSON.parse(userData);
      const token: AuthToken = JSON.parse(tokenData);

      const expiryDate = new Date(token.expiry);
      const now = new Date();

      if (now < expiryDate) {
        setUser(userDetail);
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setIsLoggedIn(false);
      }
    }
  }, []);

  const authenticateUser = useCallback(async (url: string, body: unknown) => {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }

      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', JSON.stringify(data.token));
      setUser(data.user);
      setIsLoggedIn(true);
      setError(null);
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(
    (email: string, password: string) => {
      authenticateUser('/api/login', { email, password });
    },
    [authenticateUser]
  );

  const register = useCallback(
    (email: string, password: string, name: string) => {
      authenticateUser('/api/register', { email, password, name });
    },
    [authenticateUser]
  );

  return { user, isLoggedIn, error, loading, login, register };
};

export default useAuth;
