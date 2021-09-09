import React from 'react'
import L from 'leaflet'
import { Marker, Popup } from 'react-leaflet'


import mapMarker from '../../assets/icons/mapMarker.svg'
import mapMarkerA from '../../assets/icons/mapMarkerA.svg'
import mapMarkerB from '../../assets/icons/mapMarkerB.svg'
import mapMarkerC from '../../assets/icons/mapMarkerC.svg'
import mapMarkerD from '../../assets/icons/mapMarkerD.svg'
import mapMarkerE from '../../assets/icons/mapMarkerE.svg'
import mapMarkerH from '../../assets/icons/mapMarkerH.svg'
import './markerV.scss'


const getIcon = (color) => {
  let iconUrl;
  switch (color) {
    case 'A':
      iconUrl = mapMarkerA//'lightblue'
      break;
    case 'B':
      iconUrl = mapMarkerB//'red'
      break
    case 'C':
      iconUrl = mapMarkerC//'lightblue'
      break
    case 'D':
      iconUrl = mapMarkerD//'lightgreen'
      break
    case 'E':
      iconUrl = mapMarkerE//'purple'
      break
    case 'H':
      iconUrl = mapMarkerH//'yellow'
      break
    default:
      iconUrl = mapMarker
  }

  const ICON = new L.Icon({
    iconUrl: iconUrl,
    iconRetinaUrl: iconUrl,
    popupAnchor: [-0, -0],
    iconSize: [32, 45],
  });

  return ICON
}

const MarkerV = ({ color, reference, position, information }) => {
  const i = getIcon(color)

  const sortedInformation = information && information.sort((a, b) => a.direction > b.direction ? 1 : -1)
  console.log(information)
  return (
    <Marker
      icon={i}
      position={position}
    >
      <Popup>
        {
          reference
            ? <div className='refMarker' title={`Latitud: ${position.lat}, Longitud: ${position.lng}`}>
              <span>{reference}</span>
              {
                information?.length && sortedInformation
                  ? <>
                    <hr />
                    <ul>

                      {
                        sortedInformation.map(i => <li>
                          Sentido: {i.direction} - {i.arrivalTime.full.time}
                        </li>
                        )
                      }
                    </ul>
                  </>
                  : null
              }

            </div>
            : <div className='noRefMarker'>
              <div> <strong>Latitud:</strong><span>{position.lat}</span></div>
              <div> <strong>Longitud:</strong><span>{position.lng}</span></div>
            </div>
        }
      </Popup>
    </Marker >
  )
}

export default MarkerV