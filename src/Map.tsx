import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import CircleMark from './CircleMark';
import { evaluatedAnswer, question } from './types';
import { LatLngExpression } from 'leaflet';

import * as data from './data/fr41.json';
import bundeslaender from './data/bundeslaender.geojson.json';
import dialectregions from './data/All_Dialektregionen_no_formatting.geojson.json';

import { useContext, useState } from 'react';
import Legend from './Legend';
import { QuestionContext } from './App';

type MapProps = {
  visible: boolean;
  mapLayer: string;
  showDialect: boolean;
  usedColors: Map<string, string> | undefined;
};

export default function Map({
  visible,
  mapLayer,
  showDialect,
  usedColors,
}: MapProps) {
  //@ts-ignore
  const [zoom, setZoom] = useState(7);
  const position: LatLngExpression = [47.5939, 14.1245];
  const dataList: question = data as question;

  const evaluatedData: Array<evaluatedAnswer> | null =
    useContext(QuestionContext);

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
        evaluatedData={evaluatedData ? evaluatedData : []}
      />
    </MapContainer>
  );
}

/*
 */
