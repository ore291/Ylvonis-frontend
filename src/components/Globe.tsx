import React, { useEffect, useRef, useState } from 'react'
import Globe from 'react-globe.gl'
import { ref } from 'yup'

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
  )
}

export default GlobeComponent
