import React from 'react'
import { ComposableMap, ZoomableGroup, Geographies, Geography } from 'react-simple-maps'

const wrapperStyles = {
  position: 'absolute',
  left: '0',
  right: '0',
  top: '0',
  bottom: '0',
  width: '100%',
  height: '100%',
  zIndex: -1
}

const polygonStyles = {
  fill: '#EFEFEF',
  stroke: '#EFEFEF',
  strokeWidth: 1,
  fillOpacity: 0.3,
  outline: 'none'
}

export default () => {
  return (
    <div style={wrapperStyles}>
      <ComposableMap
        projectionConfig={{
          scale: 400,
          rotation: [0, 0, 0]
        }}
        width={980}
        height={980}
        style={{
          position: 'absolute',
          width: '100%',
          left: '0',
          right: '0',
          height: 'auto',
          zIndex: '0'
        }}
      >
        <ZoomableGroup center={[0, 20]} disablePanning>
          <Geographies geography="/static/data/world-50m.json">
            {(geographies, projection) =>
              geographies.map(
                (geography, i) =>
                  geography.id !== 'ATA' && (
                    <Geography
                      key={i}
                      geography={geography}
                      projection={projection}
                      style={{
                        default: polygonStyles,
                        hover: polygonStyles,
                        pressed: polygonStyles
                      }}
                    />
                  )
              )
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  )
}
