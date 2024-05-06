import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import CircleMark from './CircleMark';
import { dropDownEntry, evaluatedAnswer, question } from './types';
import { LatLngExpression } from 'leaflet';

import * as data from './data/fr41.json';
import bundeslaender from './data/bundeslaender.geojson.json';
import dialectregions from './data/All_Dialektregionen_no_formatting.geojson.json';

import { useState } from 'react';
import Legend from './Legend';

type MapProps = {
  mapLayer: string;
  showDialect: boolean;
  usedColors: Map<string, string> | undefined;
  selectedQuestion: dropDownEntry<evaluatedAnswer[]>;
};

export default function Map({
  mapLayer,
  showDialect,
  usedColors,
  selectedQuestion,
}: MapProps) {
  //@ts-ignore
  const [zoom, setZoom] = useState(7);
  const position: LatLngExpression = [47.5939, 14.1245];
  const dataList: question = data as question;

  return (
    <MapContainer
      maxZoom={10}
      className={`-z-0 w-full min-h-[60vh] ${true ? 'visible' : 'hidden'}`}
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

      {selectedQuestion ? (
        <CircleMark
          dataList={dataList}
          showPropCircles={true}
          evaluatedData={
            selectedQuestion.entries ? selectedQuestion.entries : []
          }
        />
      ) : (
        ''
      )}
    </MapContainer>
  );
}

/*
 */
