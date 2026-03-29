import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuthStore } from '@/store/authStore';
import type { IUser } from '@/types';
import { request } from '@/utils';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const setHasHydrated = useAuthStore((state) => state.setHasHydrated);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  const publicPaths = ['/login', '/404'];
  const isPublicPath = publicPaths.includes(location.pathname);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      if (isPublicPath) {
        setHasHydrated(true);
        setIsLoading(false);
        return;
      }

      if (isAuthenticated && user && hasCheckedAuth) {
        setIsLoading(false);
        return;
      }

      if (isAuthenticated && user && !hasCheckedAuth) {
        try {
          await request<IUser>({
            url: 'api/user/getCurrentUser',
            skipError: true,
          });
          if (isMounted) {
            setHasCheckedAuth(true);
            setHasHydrated(true);
            setIsLoading(false);
          }
        } catch {
          if (isMounted) {
            setHasCheckedAuth(false);
            setIsLoading(false);
          }
        }
        return;
      }

      try {
        const currentUser = await request<IUser>({
          url: 'api/user/getCurrentUser',
          skipError: true,
        });

        if (isMounted && currentUser) {
          login(currentUser);
          setHasCheckedAuth(true);
        }
      } catch {
        // 用户未登录或 token 已过期
      } finally {
        if (isMounted) {
          setHasHydrated(true);
          setIsLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [
    isPublicPath,
    isAuthenticated,
    user,
    login,
    setHasHydrated,
    hasCheckedAuth,
  ]);

  if (isLoading) {
    return null;
  }

  const isAuthed = isAuthenticated && !!user;

  if (!isAuthed && !isPublicPath) {
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  if (isAuthed && location.pathname === '/login') {
    const redirectParam = new URLSearchParams(location.search).get('redirect');
    const redirectPath = redirectParam
      ? decodeURIComponent(redirectParam)
      : '/';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}
