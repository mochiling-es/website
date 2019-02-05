import React from 'react'
import { ComposableMap, ZoomableGroup, Geographies, Geography, Markers, Marker } from 'react-simple-maps'
import { size } from 'lodash'

const wrapperStyles = {
  position: 'absolute',
  left: '0',
  right: '0',
  top: '0',
  bottom: '0',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  zIndex: -1
}

const markerStyles = () => ({
  fill: '#E74525',
  circle: {
    stroke: '#FFFFFF',
    strokeWidth: 1,
    opacity: 0.9
  }
})

const polygonStyles = isItIncluded => ({
  fill: isItIncluded ? '#EAEAEA' : '#F8F8F8',
  stroke: isItIncluded ? '#DCDCDC' : '#EFEFEF',
  strokeWidth: 1,
  opacity: '0.65',
  fillOpacity: '0.65',
  strokeOpacity: '1',
  outline: 'none'
})

export default props => {
  const countries = props.countries || []
  const markers = props.markers || []
  const center = props.center || [-3, 43]
  const rotation = props.rotation || [0, 0, 0]
  const scale = props.scale || 350
  const height = props.height || 900
  const width = props.width || 900
  const yOffset = props.yOffset || 0
  const xOffset = props.xOffset || 0
  const _markerStyles = markerStyles()

  return (
    <div style={wrapperStyles}>
      <ComposableMap
        projection={'mercator'}
        projectionConfig={{
          yOffset,
          xOffset,
          scale,
          rotation
        }}
        width={width}
        height={height}
        style={{
          position: 'absolute',
          width: '100%',
          left: '0',
          right: '0',
          height: 'auto',
          zIndex: '0'
        }}
      >
        <ZoomableGroup center={center} disablePanning>
          <Geographies geography="/static/assets/data/world-50m.json" disableOptimization={true}>
            {(geographies, projection) =>
              geographies.map((geography, i) => {
                const countryName = geography.properties.name
                const isItIncluded =
                  (countries && countryName && countries.includes(countryName.toLowerCase())) || false
                const _polygonStyles = polygonStyles(isItIncluded)

                return (
                  geography.id !== 'ATA' && (
                    <Geography
                      key={i}
                      geography={geography}
                      projection={projection}
                      style={{
                        default: _polygonStyles,
                        hover: _polygonStyles,
                        pressed: _polygonStyles
                      }}
                    />
                  )
                )
              })
            }
          </Geographies>
          {size(markers) > 0 && (
            <Markers>
              {markers.map((marker, i) => (
                <Marker
                  key={i}
                  marker={marker}
                  style={{
                    default: _markerStyles,
                    hover: _markerStyles,
                    pressed: _markerStyles
                  }}
                >
                  <circle cx={0} cy={0} r={4} style={_markerStyles.circle} />
                </Marker>
              ))}
            </Markers>
          )}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  )
}
