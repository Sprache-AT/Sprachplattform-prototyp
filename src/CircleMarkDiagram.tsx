import { Marker, Popup } from 'react-leaflet';
import { evaluatedAnswer } from './types';
import { drawCircleDiagram } from './service/MapCompute';

import L from 'leaflet';
import { groupByValues } from './service/helper';
import CircleIcon from './CircleIcon';

type CircleMarkDiagramProps = {
  data: Array<evaluatedAnswer>;
};

export default function CircleMarkDiagram({ data }: CircleMarkDiagramProps) {
  return (
    <>
      {data.map((loc, idx) => {
        if (loc.geometry.coordinates && loc.geometry.coordinates.length === 2) {
          let data = groupByValues(loc.answers, 'id');
          data = data.sort((a, b) =>
            b.v - a.v && a.id === 'Sonstiges' ? 1 : -1
          );
          const icon: L.DivIcon = L.divIcon({
            iconSize: [30, 30],
            className: 'marker',
            html: drawCircleDiagram(
              30,
              1,
              '#000',
              loc.answers[0].c,
              data,
              false
            ),
          });
          const position: L.LatLngExpression = [
            loc.geometry.coordinates[0],
            loc.geometry.coordinates[1],
          ];
          return (
            <Marker key={`marker-${idx}`} icon={icon} position={position}>
              <Popup>
                <span>
                  {loc.location}, {loc.PLZ} <br />
                  {data.map((ans, idx) => {
                    return (
                      <div key={`answer-${idx}`} className='flex'>
                        <CircleIcon color={ans.c} size={15} />
                        <div className='ml-2'>
                          {ans.id}: {ans.v}
                        </div>
                      </div>
                    );
                  })}
                </span>
              </Popup>
            </Marker>
          );
        }
      })}
    </>
  );
}
