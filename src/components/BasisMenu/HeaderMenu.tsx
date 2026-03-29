import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Layout, Space } from 'antd';

import { useAuthStore } from '@/store/authStore';
import { request } from '@/utils';

import type { MenuProps } from 'antd';

const { Header } = Layout;

export default function HeaderMenu() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await request({
        url: 'api/user/loginOut',
        skipError: true,
      });
    } catch {
      // 即使登出接口失败，也清除本地状态
    }
    logout();
    window.location.href = '/login';
  };

  const menuItems: MenuProps['items'] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ];

  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '0 24px',
      }}
    >
      <Space>
        <Dropdown menu={{ items: menuItems }} placement="bottomRight">
          <Button type="text" icon={<UserOutlined />} style={{ color: '#fff' }}>
            {user?.account || '用户'}
          </Button>
        </Dropdown>
      </Space>
    </Header>
  );
}
