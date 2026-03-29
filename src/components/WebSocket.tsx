import { useEffect, useRef, useCallback } from 'react';
import { Modal } from 'antd';
import io, { Socket } from 'socket.io-client';

interface WebSocketProps {
  dataName: string;
  userId?: number;
  callback: (data: unknown) => void;
}

export default function WebSocket({
  dataName,
  userId,
  callback,
}: WebSocketProps) {
  const socketRef = useRef<Socket | null>(null);
  const callbackRef = useRef(callback);
  const errTimesRef = useRef(0);

  callbackRef.current = callback;

  const handleConnect = useCallback(() => {
    errTimesRef.current = 0;
    socketRef.current?.emit('addSocket', { userId });
    Modal.destroyAll();
  }, [userId]);

  const handleData = useCallback(
    (data: string) => {
      try {
        const parsedData = JSON.parse(data);
        callbackRef.current(parsedData);
      } catch {
        console.warn('WebSocket 数据解析失败');
      }
    },
    [],
  );

  const handleConnectError = useCallback(() => {
    errTimesRef.current += 1;

    if (errTimesRef.current === 1) {
      socketRef.current?.emit('delectSocket', { userId });
    }

    if (errTimesRef.current === 10) {
      Modal.error({
        title: '连接错误',
        content: '网络连接异常，需要刷新页面处理！如还异常，请联系管理员。',
        okText: '刷新',
        onOk: () => history.go(),
      });
    }
  }, [userId]);

  useEffect(() => {
    const socket = io(__CONFIG__.IP[import.meta.env.MODE]);
    socketRef.current = socket;
    errTimesRef.current = 0;

    socket.on('connect', handleConnect);
    socket.on(dataName, handleData);
    socket.on('connect_error', handleConnectError);

    return () => {
      socket.emit('delectSocket', { userId });
      socket.off('connect', handleConnect);
      socket.off(dataName, handleData);
      socket.off('connect_error', handleConnectError);
      socket.close();
      socketRef.current = null;
    };
  }, [dataName, userId, handleConnect, handleData, handleConnectError]);

  return null;
}
