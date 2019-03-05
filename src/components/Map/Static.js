import React, { Component, Fragment } from 'react'

import data from '../../../static/assets/data/countries.json'

let Map, VectorGridDefault, VectorGrid, Marker, CircleMarker

class StaticMap extends Component {
  state = {
    showMap: false
  }

  componentDidMount = () => {
    let RL = require('react-leaflet')
    Map = RL.Map
    CircleMarker = RL.CircleMarker
    Marker = RL.Marker
    const withLeaflet = RL.withLeaflet
    VectorGridDefault = require('react-leaflet-vectorgrid')
    VectorGrid = withLeaflet(VectorGridDefault)

    this.setState({ showMap: true })
  }

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
      type: 'slicer',
      data,
      style: ({ ISO_A3 }) => {
        const isItIncluded = countriesCode.includes(ISO_A3.toLowerCase()) || false

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
      },
      zIndex: 10
    }

    return (
      <Fragment>
        {this.state.showMap ? (
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
            boxZoom={true}
            dragging={false}
            attributionControl={false}
            scrollWheelZoom={false}
            touchZoom={false}
            center={(center && [center[1], center[0]]) || [43, -3]}
            zoom={3}
          >
            <VectorGrid {...options} />

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
        ) : null}
      </Fragment>
    )
  }
}

export default StaticMap
