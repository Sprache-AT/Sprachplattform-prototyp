import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import CircleMark from './CircleMark';
import { question } from './types';
import { LatLngExpression, map } from 'leaflet';

import * as data from './data/fr41.json';
import bundeslaender from './data/bundeslaender.geojson.json';

import { useEffect, useState } from 'react';

type MapProps = {
  visible: boolean;
  mapLayer: string;
};

export default function Map({ visible, mapLayer }: MapProps) {
  const [zoom, setZoom] = useState(7);
  const [bL, setBl] = useState({} as GeoJSON.FeatureCollection); // Bundesland
  const position: LatLngExpression = [47.5939, 14.1245];
  const dataList: question = data as question;
  console.log(visible);
  return (
    <MapContainer
      maxZoom={10}
      className={`-z-0 flex-auto h-5/6 w-full relative ${
        true ? 'visible' : 'hidden'
      }`}
      center={position}
      zoom={zoom}
      scrollWheelZoom={true}
    >
      {mapLayer === 'geojson' ? (
        <GeoJSON
          attribution='&copy; SFB/DiÖ'
          data={bundeslaender as GeoJSON.FeatureCollection}
        />
      ) : (
        <TileLayer
          className=''
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
      )}

      <CircleMark dataList={dataList} showPropCircles={true} />
    </MapContainer>
  );
}

/*
 */
