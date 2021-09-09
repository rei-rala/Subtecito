import React, { useContext } from "react";
import { Subte } from "../../contexts/SubteContext";
import './subteDisplay.scss'

const SubteDisplay = () => {
  const { lastUpdated } = useContext(Subte)

  return (
    lastUpdated
      ? <div className="lastUpdateSign" title='Ultima Actualizacion'>
        < span > {lastUpdated}</span >
      </div >
      : null
  )
}

export default SubteDisplay