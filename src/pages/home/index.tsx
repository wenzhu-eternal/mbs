import { Button, Modal, message } from 'antd';

import { request } from '@/utils';

export interface User {
  id: number;
  account: string;
  phone?: string;
  email?: string;
  roleId?: number;
  role?: {
    id: number;
    name: string;
  };
  createTime: string;
  updateTime: string;
  lastLoginTime?: string;
  isDisable: boolean;
}

export interface FindUsersResponse {
  list: User[];
  total: number;
  page: number;
  pageSize: number;
}

export default function Home() {
  const getData = () => {
    request<FindUsersResponse>({
      url: 'api/user/findUsers',
      method: 'GET',
      params: { page: 1, pageSize: 10 },
    })
      .then((res) =>
        Modal.success({
          content: JSON.stringify(res),
        }),
      )
      .catch((err: unknown) => message.error('获取失败' + err));
  };

  return (
    <div>
      <Button onClick={getData}>查询数据</Button>
    </div>
  );
}
