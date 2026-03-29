import { Map as AMapMap, APILoader, Geolocation } from '@uiw/react-amap';

export default function Map() {
  return (
    <div id="main" style={{ display: 'flex', width: '50vw', height: '50vh' }}>
      <APILoader akey="f622d8e768c45b319da3752cb9efe839">
        <AMapMap style={{ height: '50vh' }}>
          <Geolocation />
        </AMapMap>
      </APILoader>
    </div>
  );
}
