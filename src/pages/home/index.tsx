import { request } from '@/utils';
import { Button, Divider, Form, Input } from 'antd';

export default function Home() {
  const onFinish = (values: any) => {
    request({
      url: 'api/user/login',
      method: 'POST',
      data: values,
    })
      .then((res: any) => console.log('res :>> ', res))
      .catch((err: any) => console.log('err :>> ', err));
  };

  const getData = () => {
    request({
      url: 'api/user/findUsers?page=1&pageSize=10',
      method: 'GET',
    })
      .then((res: any) => console.log('res :>> ', res))
      .catch((err: any) => console.log('err :>> ', err));
  };

  const loginOut = () => {
    request({
      url: 'api/user/loginOut',
      method: 'GET',
    })
      .then((res: any) => console.log('res :>> ', res))
      .catch((err: any) => console.log('err :>> ', err));
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
