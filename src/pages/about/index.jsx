import WebSocket from '@/components/WebSocket';

export default function About() {
  return (
    <h2>
      <WebSocket
        dataName="wsData"
        userId={1}
        callback={(data) => console.log('data :>> ', data)}
      />
      WebSocket
    </h2>
  );
}
