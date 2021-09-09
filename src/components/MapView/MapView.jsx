import React, { useContext, useEffect, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { Subte } from '../../contexts/SubteContext'
import { coord } from '../../coordenadasSubte/coordenadasSubte'

import MarkerV from '../MarkerV/MarkerV'

const defaultLocation = { lat: -34.5923209, lng: -58.4476092 }

const MapView = ({ markers }) => {
  const { estacionesInfo } = useContext(Subte)
  const [stationsInAPI, setStationsInAPI] = useState([])

  stationsInAPI.length && console.log(stationsInAPI)

  useEffect(() => {
    if (estacionesInfo) {
      let found = []
      const filtrado = coord.filter(estCoord => !!estCoord.apiName)
      filtrado.forEach(f => {
        found[(f.linea) + '_' + (f.apiName)] = estacionesInfo.filter(ei => ei.stopName === f.apiName && ei.linea === f.linea)
      })
      console.log(found)
      setStationsInAPI(found)
    }
  }, [estacionesInfo])

  return (
    <MapContainer center={defaultLocation} zoom={12} scrollWheelZoom={true} style={{ width: '100vw', height: '100vh' }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        markers.length
          ? markers
            .map((m, i) => <MarkerV
              key={i}
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
              key={e.id}
              color={e.linea}
              reference={e.apiName ? e.apiName : e.estacion}
              position={{ lat: e.lat, lng: e.lng }}
              information={e.apiName && stationsInAPI[(e.linea) + '_' + (e.apiName)] ? stationsInAPI[(e.linea) + '_' + (e.apiName)] : undefined}
            />
          }
          )
      }



    </MapContainer>
  )
}

export default MapView