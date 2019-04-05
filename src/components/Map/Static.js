import React, { Component, Fragment } from 'react'
import dynamic from 'next/dynamic'

import data from './countries.json'

const Map = dynamic(
  () =>
    import('react-leaflet').then(mod => {
      return mod.Map
    }),
  {
    ssr: false,
    loading: () => <p>...</p>
  }
)

const Marker = dynamic(
  () =>
    import('react-leaflet').then(mod => {
      return mod.Marker
    }),
  {
    ssr: false
  }
)

const GeoJSON = dynamic(
  () =>
    import('react-leaflet').then(mod => {
      return mod.GeoJSON
    }),
  {
    ssr: false
  }
)

const CircleMarker = dynamic(
  () =>
    import('react-leaflet').then(mod => {
      return mod.CircleMarker
    }),
  {
    ssr: false
  }
)

class StaticMap extends Component {
  componentDidUpdate = () => {
    const { xOffset, yOffset } = this.props

    if (!this.map) {
      return
    }

    if (xOffset && yOffset) {
      this.map.panBy([-xOffset, -yOffset], { animate: false })
    }
  }

  render() {
    const { center, countriesCode = [], markers = [] } = this.props
    const options = {
      data,
      style: ({ properties: { iso_a3 } }) => {
        const isItIncluded = countriesCode.includes(iso_a3.toLowerCase()) || false

        let styles = {
          color: '#EFEFEF',
          weight: 1,
          opacity: 0.85,
          fillColor: '#EFEFEF',
          fillOpacity: 0.2,
          fill: true,
          stroke: true
        }

        if (isItIncluded) {
          styles.fillColor = '#BCBCBC'
          styles.color = '#DCDCDC'
        }

        return styles
      }
    }

    return (
      <Fragment>
        <Map
          ref={node => {
            if (node) {
              this.map = node.leafletElement
            }
          }}
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
            bottom: '0',
            left: '0',
            zIndex: 0,
            backgroundColor: '#FFF'
          }}
          keyboard={false}
          doubleClickZoom={false}
          boxZoom={false}
          zoomControl={false}
          dragging={false}
          attributionControl={false}
          scrollWheelZoom={false}
          touchZoom={false}
          center={(center && [center[1], center[0]]) || [43, -3]}
          zoom={3}
        >
          <GeoJSON {...options} />

          {markers.map((marker, i) => {
            const { coordinates } = marker
            return (
              <Marker key={i} position={[coordinates[1], coordinates[0]]}>
                <CircleMarker
                  center={[coordinates[1], coordinates[0]]}
                  color="#FFF"
                  opacity="1"
                  fillColor="#E74525"
                  fillOpacity="1"
                  weight={1}
                  radius={5}
                />
              </Marker>
            )
          })}
        </Map>
      </Fragment>
    )
  }
}

export default StaticMap
