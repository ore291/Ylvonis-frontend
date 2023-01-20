// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react'

import Globe from 'react-globe.gl'
import { ref } from 'yup'


export interface Features {
  type: string;
  properties: Properties;
  bbox?: (number)[] | null;
  geometry: Geometry;
}
export interface Properties {
  scalerank: number;
  featurecla: string;
  LABELRANK: number;
  SOVEREIGNT: string;
  SOV_A3: string;
  ADM0_DIF: number;
  LEVEL: number;
  TYPE: string;
  ADMIN: string;
  ADM0_A3: string;
  GEOU_DIF: number;
  GEOUNIT: string;
  GU_A3: string;
  SU_DIF: number;
  SUBUNIT: string;
  SU_A3: string;
  BRK_DIFF: number;
  NAME: string;
  NAME_LONG: string;
  BRK_A3: string;
  BRK_NAME: string;
  BRK_GROUP?: null;
  ABBREV: string;
  POSTAL: string;
  FORMAL_EN: string;
  FORMAL_FR?: null;
  NAME_CIAWF: string;
  NOTE_ADM0?: null;
  NOTE_BRK?: null;
  NAME_SORT: string;
  NAME_ALT?: null;
  MAPCOLOR7: number;
  MAPCOLOR8: number;
  MAPCOLOR9: number;
  MAPCOLOR13: number;
  POP_EST: number;
  POP_RANK: number;
  GDP_MD_EST: number;
  POP_YEAR: number;
  LASTCENSUS: number;
  GDP_YEAR: number;
  ECONOMY: string;
  INCOME_GRP: string;
  WIKIPEDIA: number;
  FIPS_10_: string;
  ISO_A2: string;
  ISO_A3: string;
  ISO_A3_EH: string;
  ISO_N3: string;
  UN_A3: string;
  WB_A2: string;
  WB_A3: string;
  WOE_ID: number;
  WOE_ID_EH: number;
  WOE_NOTE: string;
  ADM0_A3_IS: string;
  ADM0_A3_US: string;
  ADM0_A3_UN: number;
  ADM0_A3_WB: number;
  CONTINENT: string;
  REGION_UN: string;
  SUBREGION: string;
  REGION_WB: string;
  NAME_LEN: number;
  LONG_LEN: number;
  ABBREV_LEN: number;
  TINY: number;
  HOMEPART: number;
  MIN_ZOOM: number;
  MIN_LABEL: number;
  MAX_LABEL: number;
}
export interface Geometry {
  type: string;
  coordinates?: (((number)[] | null)[] | null)[] | null;
}



const GlobeComponent = () => {
  const [places, setPlaces] = useState([])
  const globeRef = useRef<any>(null)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    // load data
    fetch('map/data.geojson')
      .then((res) => res.json())
      .then(({ features }) => setPlaces(features))

    if (globeRef.current) {
      setWidth(globeRef?.current?.offsetWidth)
      setHeight(globeRef?.current?.offsetHeight)
    }
  }, [])

  return (
    <div className="w-full h-full" ref={globeRef}>
      {width != 0 && (
        <Globe
          width={width}
          height={450}
          backgroundColor="#000"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          hexPolygonsData={places}
          hexPolygonResolution={3}
          hexPolygonMargin={0.3}
          hexPolygonColor={() =>
            `#${Math.round(Math.random() * Math.pow(2, 24))
              .toString(16)
              .padStart(6, '0')}`
          }
          hexPolygonLabel={( features ) => `
          <b>${features?.properties?.ADMIN} (${properties.ISO_A2})</b> 
         
        `}

          // width={width}
          // height={height}
          // labelsData={places}
          // labelLat={(d) => d.latitude}
          // labelLng={(d) => d.longitude}
          // labelText={(d) => d.country}
          // labelDotRadius={0.5}
          // labelSize={0.7}
          // onLabelClick={(e) => {
          //   console.log(e)
          // }}
          // // labelSize={(d) => Math.sqrt(d.properties.pop_max) * 4e-4}
          // // labelDotRadius={(d) => Math.sqrt(d.properties.pop_max) * 4e-4}
          // labelColor={() => 'rgba(255, 165, 0, 0.75)'}
          // labelResolution={2}
        />
      )}
    </div>
  )
}

export default GlobeComponent
