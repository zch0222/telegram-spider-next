'use client'

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '@/request/client/auth';
import { logoutSuccess } from '@/store/auth/authSlice';
import { message } from 'antd';

const LogoutPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout();
        message.success('已退出登录');
      } catch (error) {
        console.error('Logout error', error);
      } finally {
        dispatch(logoutSuccess());
        router.push('/login');
      }
    };

    handleLogout();
  }, [dispatch, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>正在退出登录...</p>
    </div>
  );
};

export default LogoutPage;
