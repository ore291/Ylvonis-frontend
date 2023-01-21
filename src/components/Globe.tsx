// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react'
import Globe from 'react-globe.gl'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { ref } from 'yup'
import { Button } from './UI'

export interface Features {
  type: string
  properties: Properties
  bbox?: number[] | null
  geometry: Geometry
}
export interface Properties {
  scalerank: number
  featurecla: string
  LABELRANK: number
  SOVEREIGNT: string
  SOV_A3: string
  ADM0_DIF: number
  LEVEL: number
  TYPE: string
  ADMIN: string
  ADM0_A3: string
  GEOU_DIF: number
  GEOUNIT: string
  GU_A3: string
  SU_DIF: number
  SUBUNIT: string
  SU_A3: string
  BRK_DIFF: number
  NAME: string
  NAME_LONG: string
  BRK_A3: string
  BRK_NAME: string
  BRK_GROUP?: null
  ABBREV: string
  POSTAL: string
  FORMAL_EN: string
  FORMAL_FR?: null
  NAME_CIAWF: string
  NOTE_ADM0?: null
  NOTE_BRK?: null
  NAME_SORT: string
  NAME_ALT?: null
  MAPCOLOR7: number
  MAPCOLOR8: number
  MAPCOLOR9: number
  MAPCOLOR13: number
  POP_EST: number
  POP_RANK: number
  GDP_MD_EST: number
  POP_YEAR: number
  LASTCENSUS: number
  GDP_YEAR: number
  ECONOMY: string
  INCOME_GRP: string
  WIKIPEDIA: number
  FIPS_10_: string
  ISO_A2: string
  ISO_A3: string
  ISO_A3_EH: string
  ISO_N3: string
  UN_A3: string
  WB_A2: string
  WB_A3: string
  WOE_ID: number
  WOE_ID_EH: number
  WOE_NOTE: string
  ADM0_A3_IS: string
  ADM0_A3_US: string
  ADM0_A3_UN: number
  ADM0_A3_WB: number
  CONTINENT: string
  REGION_UN: string
  SUBREGION: string
  REGION_WB: string
  NAME_LEN: number
  LONG_LEN: number
  ABBREV_LEN: number
  TINY: number
  HOMEPART: number
  MIN_ZOOM: number
  MIN_LABEL: number
  MAX_LABEL: number
}
export interface Geometry {
  type: string
  coordinates?: ((number[] | null)[] | null)[] | null
}

const GlobeComponent = () => {
  const [places, setPlaces] = useState([])
  const globeRef = useRef<any>(null)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [country, setCountry] = useState<string>('All')

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

    <div className="w-full h-full p-0.5 md:p-2" >
      <div className="w-full flex justify-between items-center">
        <Button variant="naked" size="slim">
          <BsThreeDotsVertical className="text-white w-6 h-6" />
        </Button>
        <h2 className="capitalize text-xl font-semibold text-white">
          {country}
        </h2>
        <Button variant="naked" size="slim">
          <svg
            width="24"
            height="24"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.2782 21.4566C15.2782 22.448 14.643 23.2915 13.7486 23.6266V31.0898H12.0494V23.6269C11.1554 23.2918 10.5199 22.4477 10.5199 21.4569C10.5199 20.1719 11.5849 19.1314 12.8988 19.1314C14.2132 19.1309 15.2782 20.1719 15.2782 21.4566ZM36 12.8828V8.37461C36 3.74939 32.1643 0 27.4323 0C22.7003 0 18.864 3.74939 18.864 8.37461V14.2217H1.17305V14.222C1.17201 14.222 1.1707 14.2217 1.16966 14.2217C0.524044 14.222 0 14.7339 0 15.366C0 15.367 0 15.368 0 15.3691V34.8532C0 34.8544 0 34.8555 0 34.8562C0 35.4873 0.524044 36 1.16992 36H1.17305H24.6257H24.6288C25.2747 36 25.7995 35.4883 25.7995 34.8562C25.7995 34.8555 25.7995 34.8544 25.7995 34.8532V15.3688C25.7995 15.3678 25.7995 15.3668 25.7995 15.3658C25.7995 14.7342 25.276 14.2215 24.6288 14.2215C24.6277 14.2215 24.6267 14.2217 24.6257 14.2217V14.2215H21.5007V8.37461C21.5007 5.17281 24.156 2.57686 27.4323 2.57686C30.708 2.57686 33.3636 5.17281 33.3636 8.37461V12.753C33.3587 12.7958 33.3571 12.839 33.3571 12.883C33.3571 13.5965 33.9486 14.1744 34.6783 14.1744C35.408 14.1741 36 13.596 36 12.8828Z"
              fill="white"
            />
          </svg>
        </Button>
      </div>
      <div ref={globeRef}>
         {width != 0 && (
        <Globe
        
          width={width}
          height={450}
          backgroundColor="#000"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          hexPolygonsData={places}
          hexPolygonResolution={3}
          hexPolygonMargin={0.3}
          onHexPolygonClick={(polygon)=> setCountry(polygon.properties.NAME_LONG)}
          
          hexPolygonColor={() =>
            `#${Math.round(Math.random() * Math.pow(2, 24))
              .toString(16)
              .padStart(6, '0')}`
          }
          hexPolygonLabel={({ properties: d }) => `
          <b>${d.ADMIN} (${d.ISO_A2})</b> 
         
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
     
    </div>
  )
}

export default GlobeComponent
