import { useEffect } from 'react';
import { getIP } from '@/utils';
import io from 'socket.io-client';
import cookie from 'react-cookies';
import { Modal } from 'antd';

export default function WebSocket({
  dataName,
  callback,
}: {
  dataName: string;
  callback: (data: any) => any;
}) {
  useEffect((): any => {
    const socket = io(getIP());
    const token = cookie.load('x-auth-token');
    let errTimes = 0;

    socket.on('connect', () => {
      errTimes = 0;
      socket.emit('addSocket', { token });
    });

    socket.on(dataName, (data) => {
      callback(JSON.parse(data));
    });

    socket.on('connect_error', () => {
      if (errTimes === 10) {
        Modal.error({
          title: '连接错误',
          content: '网络连接异常，需要刷新页面处理！如还异常，请联系管理员。',
          okText: '刷新',
          onOk: () => history.go(),
        });
      }
      errTimes++;
      socket.emit('delectSocket', { token });
    });

    return () => {
      socket.emit('delectSocket', { token });
      socket.close();
    };
  }, []);

  return null;
}
