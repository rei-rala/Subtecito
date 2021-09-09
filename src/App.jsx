import React from 'react';

import { SubteContext } from './contexts/SubteContext';

import 'leaflet/dist/leaflet.css';
import MapView from './components/MapView/MapView';
import SubteDisplay from './components/Subte/SubteDisplay';

function App() {

  const markerPos = {
    reference: 'Casa',
    position: { lat: -34.57802215075736, lng: -58.4266288483466 }
  }
  const work = {
    position: { lat: -34.60842427741443, lng: -58.3722707190829 }
  }

  return (
    <>
      <SubteContext>
        <MapView markers={[markerPos, work]} />

        <SubteDisplay />
      </SubteContext>
    </>
  );
}

export default App;
