import React, { useEffect, useState } from "react";
import { timeStampToDate } from "../Helpers/Helpers";

const creds = {
  sid: process.env.REACT_APP_GCBA_API_SID,
  token: process.env.REACT_APP_GCBA_API_TOKEN
}

class LineaSubte {
  constructor(linea, routeId, tripId, direction, estaciones, start_date, start_time) {
    this.linea = linea
    this.routeId = routeId
    this.tripId = tripId
    this.direction = direction
    this.estaciones = estaciones
    this.start_date = start_date
    this.start_time = start_time
  }
}
class Estacion {
  constructor(linea, stopName, direction, arrivalTime, departureTime) {
    this.linea = linea
    this.stopName = stopName
    this.direction = direction
    this.arrivalTime = arrivalTime
    this.departureTime = departureTime
  }
}

export const Subte = React.createContext()

export const SubteContext = ({ children }) => {
  const [lastUpdated, setLastUpdated] = useState()
  const [arrayEntity, setArrayEntity] = useState([])
  const [lineaInfo, setLineaInfo] = useState([])
  const [estacionesInfo, setEstacionesInfo] = useState([])

  useEffect(() => {
    const queryURL = `client_id=${creds.sid}&client_secret=${creds.token}`
    const URL = `https://datosabiertos-transporte-apis.buenosaires.gob.ar/subtes/forecastGTFS?${queryURL}`

    const controller = new AbortController();
    const { signal } = controller;

    fetch(URL, { signal })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(r => {
        const lastUpdated = timeStampToDate(r.Header.timestamp)
        setArrayEntity(r.Entity)
        setLastUpdated(lastUpdated.full.full)
      })

    return () => {
      controller.abort();
    }
  }, [])

  useEffect(() => {
    if (arrayEntity.length) {
      const listLines = []
      const listEstaciones = []

      arrayEntity.forEach(L => {
        listLines.push(new LineaSubte(
          (L.Linea.Route_Id).charAt((L.Linea.Route_Id).length - 1),
          L.Linea.Route_Id,
          L.Linea.Trip_Id,
          L.Linea.Direction_ID,
          L.Linea.Estaciones,
          L.Linea.start_date,
          L.Linea.start_time
        ))


        L.Linea.Estaciones.forEach(e => listEstaciones.push(
          new Estacion(
            (L.Linea.Route_Id).charAt((L.Linea.Route_Id).length - 1),
            e['stop_name'],
            L.Linea.Direction_ID,
            timeStampToDate(e.arrival.time),
            timeStampToDate(e.departure.time)
          )
        ))

      })
      setLineaInfo(listLines)
      setEstacionesInfo(listEstaciones)
    }
  }, [arrayEntity])

  return (
    <Subte.Provider
      value={{
        lastUpdated,
        lineaInfo,
        estacionesInfo
      }}
    >
      {children}
    </Subte.Provider>
  )
}