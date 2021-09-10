import React, { useContext } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { Subte } from '../../contexts/SubteContext'
import { coord } from '../../coordenadasSubte/coordenadasSubte'

import MarkerV from '../MarkerV/MarkerV'

const defaultLocation = { lat: -34.5923209, lng: -58.4476092 }

const MapView = ({ markers }) => {
  const { stationsInAPI } = useContext(Subte)
  
  return (
    <MapContainer center={defaultLocation} zoom={12} scrollWheelZoom={true} style={{ width: '100vw', height: '100vh' }}>
      <TileLayer
        attribution='<a href="http://github.com/rei-rala/Subtecito">Subtecito</a>'
        //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // Tileset GCBA
        url='https://servicios.usig.buenosaires.gob.ar/mapcache/tms/1.0.0/amba_con_transporte_3857@GoogleMapsCompatible/{z}/{x}/{-y}.png '
      />
      {
        markers.length
          ? markers
            .map((m, i) => <MarkerV
              key={`userMarker${i}`}
              reference={m.reference}
              position={m.position}
            />
            )
          : null
      }

      {
        coord
          .map((e) => {
            return <MarkerV
              key={`estacion${e.id}`}
              color={e.linea}
              className='caca'
              reference={e.apiName ? e.apiName : e.estacion}
              position={{ lat: e.lat, lng: e.lng }}
              information={e.apiName && stationsInAPI[`${e.linea}_${e.apiName}`] ? stationsInAPI[`${e.linea}_${e.apiName}`] : undefined}
            />
          })
      }



    </MapContainer>
  )
}

export default MapView