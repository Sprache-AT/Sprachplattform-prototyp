import { useState } from 'react';
import { dropDownEntry, evaluatedAnswer } from './types';
import WorkBox from './WorkBox';
import Map from './Map';
import MapDropdown from './MapDropdown';
import CheckboxComp from './CheckboxComp';

import 'leaflet/dist/leaflet.css';

interface MapAnalysisProps {
  evaluatedData: Array<evaluatedAnswer> | undefined;
  usedColors: Map<string, string> | undefined;
}

export default function MapAnalysis({
  evaluatedData,
  usedColors,
}: MapAnalysisProps) {
  const entries: Array<dropDownEntry> = [
    { name: 'OpenStreetMap Tileset', value: 'osm' },
    { name: 'Bundesländer GeoJSON', value: 'geojson' },
  ];

  const [selected, setSelected] = useState(
    entries && entries.length > 0 ? entries[0] : { name: '', value: '' }
  );

  const [showDialects, setShowDialects] = useState(false);

  const MapComponent = () => (
    <Map
      visible={true}
      mapLayer={selected.value}
      showDialect={showDialects}
      usedColors={usedColors}
      evaluatedData={evaluatedData}
    ></Map>
  );
  const Dropdown = () => (
    <MapDropdown
      entries={entries}
      selected={selected}
      setSelected={(val: dropDownEntry) => setSelected(val)}
    ></MapDropdown>
  );

  const Checkbox = () => (
    <CheckboxComp
      label={'Dialektregionen anzeigen'}
      onChange={(val: boolean) => setShowDialects(val)}
    ></CheckboxComp>
  );
  return (
    <>
      <WorkBox
        Element={MapComponent}
        UiElements={[Dropdown, Checkbox]}
      ></WorkBox>
    </>
  );
}
