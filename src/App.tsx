import React, { useState } from 'react';

import './App.css';

import 'leaflet/dist/leaflet.css';

import WorkBox from './WorkBox.tsx';
import Map from './Map.tsx';
import { dropDownEntry } from './types.ts';
import MapDropdown from './MapDropdown.tsx';

function App() {
  const entries: Array<dropDownEntry> = [
    { name: 'OpenStreetMap Tileset', value: 'osm' },
    { name: 'Bundesländer GeoJSON', value: 'geojson' },
  ];
  const [selected, setSelected] = useState(
    entries && entries.length > 0 ? entries[0] : { name: '', value: '' }
  );
  const MapComponent = () => (
    <Map visible={true} mapLayer={selected.value}></Map>
  );
  const Dropwdown = () => (
    <MapDropdown
      entries={entries}
      selected={selected}
      setSelected={(val: dropDownEntry) => setSelected(val)}
    ></MapDropdown>
  );
  return (
    <>
      <WorkBox Element={MapComponent} UiElements={[Dropwdown]}></WorkBox>
    </>
  );
}

export default App;
