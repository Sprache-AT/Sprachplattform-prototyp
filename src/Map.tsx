import { MapContainer, TileLayer } from 'react-leaflet';
import CircleMark from './CircleMark';
import { question } from './types';
import { LatLngExpression } from 'leaflet';

import * as data from './data/fr30.json';
import { useState } from 'react';

type MapProps = {
  visible: boolean;
};

export default function Map() {
  const [zoom, setZoom] = useState(7);
  const position: LatLngExpression = [47.5939, 14.1245];
  const dataList: question = data as question;
  return (
    <MapContainer
      maxZoom={10}
      className={`flex-auto h-5/6 w-full relative ${
        true ? 'visible' : 'hidden'
      }`}
      center={position}
      zoom={zoom}
      scrollWheelZoom={true}
    >
      <TileLayer
        className=''
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <CircleMark dataList={dataList} showPropCircles={false} />
    </MapContainer>
  );
}
