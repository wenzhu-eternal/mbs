import { userService } from '@/services';
import { Button, Divider, Form, Input, Modal, message } from 'antd';

export default function Home() {
  const onFinish = (values: unknown) => {
    userService
      .login(values as any)
      .then(() => message.success('登陆成功！'))
      .catch((err: unknown) => message.error('登陆失败' + err));
  };

  const getData = () => {
    userService
      .findUsers({ page: 1, pageSize: 10 })
      .then((res: unknown) =>
        Modal.success({
          content: JSON.stringify(res),
        }),
      )
      .catch((err: unknown) => message.error('获取失败' + err));
  };

  const loginOut = () => {
    userService
      .loginOut()
      .then(() => message.success('登出成功！'))
      .catch((err: unknown) => message.error('登出失败' + err));
  };

  return (
    <div>
      <Form name="basic" onFinish={onFinish}>
        <Form.Item
          label="account"
          name="account"
          rules={[{ required: true, message: 'please input your account!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="password"
          name="password"
          rules={[{ required: true, message: 'please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>

      <Button onClick={getData}>查询数据</Button>
      <Divider type="vertical" />
      <Button onClick={loginOut}>退出登录</Button>
    </div>
  );
}
