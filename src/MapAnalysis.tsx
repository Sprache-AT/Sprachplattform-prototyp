import { useState } from 'react';
import { dropDownEntry, evaluatedAnswer } from './types';
import WorkBox from './WorkBox';
import Map from './Map';
import MapDropdown from './MapDropdown';
import CheckboxComp from './CheckboxComp';

import 'leaflet/dist/leaflet.css';

interface MapAnalysisProps {
  usedColors: Map<string, string> | undefined;
  questionData: Array<dropDownEntry<evaluatedAnswer[]>>;
}

export default function MapAnalysis({
  usedColors,
  questionData,
}: MapAnalysisProps) {
  const entries: Array<dropDownEntry<undefined>> = [
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
      mapLayer={selected.value as string}
      showDialect={showDialects}
      usedColors={usedColors}
    ></Map>
  );
  const Dropdown = () => (
    <MapDropdown
      entries={entries}
      selected={selected}
      setSelected={(val: dropDownEntry<undefined>) => setSelected(val)}
    ></MapDropdown>
  );

  const Checkbox = () => (
    <CheckboxComp
      label={'Dialektregionen anzeigen'}
      onChange={(val: boolean) => setShowDialects(val)}
    ></CheckboxComp>
  );
  /*
  const DataDropdown = () => (
    <MapDropdown
      entries={questionData}
      selected={selectedQ}
      setSelected={(val: dropDownEntry<evaluatedAnswer[]>) => setSelectedQ(val)}
    ></MapDropdown>
  );*/
  return (
    <>
      <WorkBox
        Element={MapComponent}
        UiElements={[Dropdown, Checkbox]}
      ></WorkBox>
    </>
  );
}
