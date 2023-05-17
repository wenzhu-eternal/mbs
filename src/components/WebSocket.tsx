import { useEffect } from 'react';
import io from 'socket.io-client';
import { Modal } from 'antd';

export default function WebSocket({
  dataName,
  userId,
  callback,
}: {
  dataName: string;
  userId?: number;
  callback: (data: any) => any;
}) {
  useEffect((): any => {
    const socket = io(__CONFIG__.IP[import.meta.env.MODE]);
    let errTimes = 0;

    socket.on('connect', () => {
      errTimes = 0;
      socket.emit('addSocket', { userId });
      Modal.destroyAll();
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
      if (errTimes === 1) socket.emit('delectSocket', { userId });
    });

    return () => {
      socket.emit('delectSocket', { userId });
      socket.close();
    };
  }, []);

  return null;
}
