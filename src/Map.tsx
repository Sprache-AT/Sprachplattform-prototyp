import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import CircleMark from './CircleMark';
import { evaluatedAnswer, question } from './types';
import { LatLngExpression, map } from 'leaflet';

import * as data from './data/fr41.json';
import bundeslaender from './data/bundeslaender.geojson.json';
import dialectregions from './data/All_Dialektregionen_no_formatting.geojson.json';

import { useEffect, useRef, useState } from 'react';
import Legend from './Legend';

type MapProps = {
  visible: boolean;
  mapLayer: string;
  showDialect: boolean;
  usedColors: Map<string, string> | undefined;
  evaluatedData: Array<evaluatedAnswer> | undefined;
};

export default function Map({
  visible,
  mapLayer,
  showDialect,
  usedColors,
  evaluatedData,
}: MapProps) {
  const [zoom, setZoom] = useState(7);
  const [bL, setBl] = useState({} as GeoJSON.FeatureCollection); // Bundesland
  const position: LatLngExpression = [47.5939, 14.1245];
  const dataList: question = data as question;
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
      <Legend colors={usedColors} />
      <GeoJSON
        style={() => {
          return { className: `${showDialect ? 'visible' : 'hidden'}` };
        }}
        attribution='&copy; SFB/DiÖ'
        data={dialectregions as GeoJSON.FeatureCollection}
      />

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

      <CircleMark
        dataList={dataList}
        showPropCircles={true}
        evaluatedData={evaluatedData}
      />
    </MapContainer>
  );
}

/*
 */
