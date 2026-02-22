'use client'

import React, { useEffect } from 'react';
import { Button, Form, Input, Card, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { changePassword } from '@/request/client/auth';
import { RootState } from '@/store';

const ChangePasswordPage = () => {
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  const onFinish = async (values: any) => {
    try {
      const res = await changePassword(values);
      if (res.data.code === 200 || res.data.code === 1) {
        message.success('密码修改成功');
        router.push('/');
      } else {
        message.error(res.data.msg || '修改失败');
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.detail || error.response?.data?.msg || error.message || '修改失败';
      message.error(errorMsg);
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card title="修改密码" className="w-full max-w-md shadow-lg">
        <Form
          name="change_password"
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            label="旧密码"
            name="old_password"
            rules={[{ required: true, message: '请输入旧密码!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="新密码"
            name="new_password"
            rules={[
              { required: true, message: '请输入新密码!' },
              { min: 6, message: '密码长度不能少于6位' }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="确认新密码"
            name="confirm_password"
            dependencies={['new_password']}
            rules={[
              { required: true, message: '请确认新密码!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('new_password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full bg-blue-600">
              确认修改
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ChangePasswordPage;
