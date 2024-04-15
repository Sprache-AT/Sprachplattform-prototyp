import { LatLngExpression } from 'leaflet';
import { determineSize } from './service/MapCompute';
import { Circle, Popup } from 'react-leaflet';

import { evaluatedAnswer, question } from './types';
import CircleMarkDiagram from './CircleMarkDiagram';

type CircleMarkProps = {
  dataList: question;
  showPropCircles: boolean;
  evaluatedData?: Array<evaluatedAnswer>;
};

// Create function with prop dataList of type any
// Use map hook to get map
// Iterate over dataList.features and create a Circle for each given feature on the map
export default function CircleMark({
  dataList,
  showPropCircles,
  evaluatedData,
}: CircleMarkProps) {
  // TODO Leverage this to adapt the size based on zoom level
  // const map = useMap();
  const baseSize = 1300;
  // Show the proportional circles based on the evaluated data
  if (showPropCircles) {
    return (
      <>{evaluatedData ? <CircleMarkDiagram data={evaluatedData} /> : <></>}</>
    );
  }
  return (
    <>
      {dataList.features.map((feat: any, idx: any) => {
        if (
          feat.geometry.coordinates &&
          feat.geometry.coordinates.length === 2
        ) {
          const position: LatLngExpression = [
            feat.geometry.coordinates[0],
            feat.geometry.coordinates[1],
          ];
          return (
            <Circle
              key={`marker-${idx}`}
              center={position}
              radius={
                baseSize *
                determineSize(
                  feat.properties.length,
                  [0, 1, 2, 10, 20, 100] // Adapt the current brackets to the current data
                  // 0-1, 2-9, 10-19, 20-99, 100+
                )
              }
            >
              <Popup>
                <span>
                  {feat.location}, {feat.PLZ}, Belege: {feat.properties.length}{' '}
                </span>
              </Popup>
            </Circle>
          );
        }
      })}
    </>
  );
}
/*


*/
