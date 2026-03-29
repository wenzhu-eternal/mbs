import { Button, Form, Input, message } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useAuthStore } from '@/store/authStore';
import type { IUser } from '@/types';
import { request } from '@/utils';

interface ILoginForm {
  account: string;
  password: string;
}

interface ILoginResponse {
  success: boolean;
  id?: number;
}

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const login = useAuthStore((state) => state.login);

  const onFinish = async (values: ILoginForm) => {
    try {
      const res = await request<ILoginResponse>({
        url: 'api/user/login',
        method: 'POST',
        data: values,
        skipError: true,
      });

      if (res?.success && res?.id) {
        try {
          const user = await request<IUser>({
            url: 'api/user/getCurrentUser',
            skipError: true,
          });

          if (user) {
            login(user);
            message.success('登陆成功！');
            const redirectParam = searchParams.get('redirect');
            const redirectPath = redirectParam ? decodeURIComponent(redirectParam) : '/';
            navigate(redirectPath);
          } else {
            message.error('获取用户信息失败，请重试！');
          }
        } catch (userError) {
          console.error('获取用户信息失败:', userError);
          message.error('获取用户信息失败，请重试！');
        }
      } else {
        message.error('账号或密码错误，请重试！');
      }
    } catch (error) {
      console.error('登录请求失败:', error);
      message.error('登录失败，请检查网络连接后重试！');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Form name="login" onFinish={onFinish}>
        <Form.Item
          label="账号"
          name="account"
          rules={[{ required: true, message: '请输入你的账号!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入你的密码!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登陆
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
