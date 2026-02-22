'use client'

import React, { useEffect } from 'react';
import { Button, Form, Input, Card, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { login } from '@/request/client/auth';
import { loginSuccess } from '@/store/auth/authSlice';
import { RootState } from '@/store';

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  const onFinish = async (values: any) => {
    try {
      const res = await login(values);
      if (res.data.code === 200 || res.data.code === 1) {
        message.success('登录成功');
        dispatch(loginSuccess({ username: values.username }));
        router.push('/');
      } else {
        message.error(res.data.msg || '登录失败');
      }
    } catch (error: any) {
      const msg = typeof error === 'string' ? error : (error.response?.data?.msg || error.message || '登录失败');
      message.error(msg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card title="用户登录" className="w-full max-w-md shadow-lg">
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full bg-blue-600">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
