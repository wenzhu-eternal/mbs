import AMapLoader from '@amap/amap-jsapi-loader';
import { useEffect } from 'react';

export default function Map() {
  useEffect(() => {
    AMapLoader.load({
      key: 'f622d8e768c45b319da3752cb9efe839',
      version: '2.0',
      plugins: ['AMap.Geolocation'],
    }).then((Amap) => {
      const geolocation = new Amap.Geolocation({
        enableHighAccuracy: true,
      });

      geolocation.getCurrentPosition((_, { position }) => {
        const map = new Amap.Map('main', {
          zoom: 15,
          center: [position.lng, position.lat],
        });

        const marker = new Amap.Marker({
          position: new Amap.LngLat(position.lng, position.lat),
          title: '当前位置',
        });

        map.add(marker);
      });
    });
  }, []);

  return (
    <div
      id="main"
      style={{ display: 'flex', width: '50vw', height: '50vh' }}
    ></div>
  );
}
