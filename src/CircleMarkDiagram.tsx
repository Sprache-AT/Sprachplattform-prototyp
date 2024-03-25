import { Marker, Popup } from 'react-leaflet';
import { evaluatedAnswer } from './types';
import { drawCircleDiagram } from './service/MapCompute';

import L from 'leaflet';

type CircleMarkDiagramProps = {
  data: Array<evaluatedAnswer>;
};

export default function CircleMarkDiagram({ data }: CircleMarkDiagramProps) {
  console.log(data);
  return (
    <>
      {data.map((loc, idx) => {
        if (loc.geometry.coordinates && loc.geometry.coordinates.length === 2) {
          const icon: L.DivIcon = L.divIcon({
            iconSize: [30, 30],
            className: 'marker',
            html: drawCircleDiagram(
              30,
              1,
              '#000',
              loc.answers[0].c,
              loc.answers,
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
                  {loc.location}, {loc.PLZ}, Belege: {loc.answers.length}{' '}
                </span>
              </Popup>
            </Marker>
          );
        }
      })}
    </>
  );
}
