import { request } from '@/utils';
import { useEffect } from 'react';
import WebSocket from '@/components/WebSocket';

export default function About() {
  useEffect(() => {
    request({
      url: 'api/user/findUsers?page=1&pageSize=10',
      method: 'GET',
    })
      .then((res: any) => console.log('res :>> ', res))
      .catch((err: any) => console.log('err :>> ', err));
  }, []);

  return (
    <h2>
      <WebSocket
        dataName="wsData"
        callback={(data) => console.log('data :>> ', data)}
      />
      WebSocket
    </h2>
  );
}
