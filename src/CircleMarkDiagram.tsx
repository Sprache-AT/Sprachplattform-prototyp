import { Marker, Popup } from 'react-leaflet';
import { evaluatedAnswer } from './types';
import { determineSize, drawCircleDiagram } from './service/MapCompute';

import L from 'leaflet';
import CircleIcon from './CircleIcon';

type CircleMarkDiagramProps = {
  inputData: Array<evaluatedAnswer>;
};

export default function CircleMarkDiagram({
  inputData,
}: CircleMarkDiagramProps) {
  return (
    <>
      {inputData.map((loc, idx) => {
        if (
          loc.answers.length > 0 &&
          loc.geometry.coordinates &&
          loc.geometry.coordinates.length === 2
        ) {
          let data = loc.answers;
          data = data.sort((a, b) =>
            b.v - a.v && a.id === 'Sonstiges' ? 1 : -1
          );
          const size = loc.answers.reduce((a, b) => a + b.v, 0);
          const icon: L.DivIcon = L.divIcon({
            iconSize: [30, 30],
            className: 'marker',
            html: drawCircleDiagram(
              20 *
                determineSize(
                  size,
                  [0, 1, 5, 10, 20, 30, 40, 100] // Adapt the current brackets to the current data
                  // 0-1, 2-9, 10-19, 20-99, 100+
                ),
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
                          {ans.id}: {ans.v}, Register: {ans.reg}
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
