'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import { RootState } from '@/store';
import { initializeAuth } from '@/store/auth/authSlice';
import { Spin } from 'antd';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, isInitialized } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isInitialized && !isLoggedIn && pathname !== '/login') {
      router.push('/login');
    }
  }, [isInitialized, isLoggedIn, pathname, router]);

  // If not initialized, show loading or nothing.
  // Or if initialized and not logged in (and not on login page), we are redirecting, so show nothing.
  if (!isInitialized) {
      return (
          <div className="flex items-center justify-center min-h-screen">
              <Spin size="large" />
          </div>
      );
  }

  if (!isLoggedIn && pathname !== '/login') {
      return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
