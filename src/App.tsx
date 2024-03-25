import React, { useState } from 'react';

import './App.css';

import 'leaflet/dist/leaflet.css';

import WorkBox from './WorkBox.tsx';
import Map from './Map.tsx';

function App() {
  return (
    <>
      <WorkBox Element={Map}></WorkBox>
    </>
  );
}

export default App;
