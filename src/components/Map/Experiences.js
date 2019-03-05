import React, { Component, Fragment } from 'react'
import { filter, size, reduce, each } from 'lodash'
import isoCountries from 'i18n-iso-countries'

import data from '../../../static/assets/data/countries.json'
import ExperiencePopup from './ExperiencePopup'
import { i18nHelper } from '../i18n'

let L, Map, VectorGridDefault, VectorGrid, Popup, Hash

class ExperiencesMap extends Component {
  state = {
    showMap: false,
    positionPopup: null,
    belongingExperiences: []
  }

  componentDidMount = () => {
    let RL = require('react-leaflet')
    L = require('leaflet')

    Map = RL.Map
    Popup = RL.Popup
    const withLeaflet = RL.withLeaflet
    VectorGridDefault = require('react-leaflet-vectorgrid')
    VectorGrid = withLeaflet(VectorGridDefault)

    require('leaflet-hash')

    each(i18nHelper.supportLangs, lang => {
      isoCountries.registerLocale(require(`i18n-iso-countries/langs/${lang}.json`))
    })

    this.setState({ showMap: true })
  }

  componentDidUpdate = () => {
    if (!this.map) {
      return
    }

    new L.Hash(this.map)
  }

  onMapClick = () => {
    const { onMapClick } = this.props
    onMapClick && onMapClick()
  }

  onLayerClick = ({ layer, latlng }) => {
    const belongingExperiences = this.belongingExperiences(layer.properties.iso_a3)
    let positionPopup = null

    if (size(belongingExperiences) > 0) {
      positionPopup = [latlng.lat, latlng.lng]
    }

    this.setState({ positionPopup, belongingExperiences })
  }

  belongsToAnyExperience = countryCode => {
    return size(this.belongingExperiences(countryCode)) > 0
  }

  belongingExperiences = countryCode => {
    const { experiences, isUserLogged } = this.props

    return filter(experiences, function(experience) {
      if (experience.published || isUserLogged) {
        return experience.countries && experience.countries.includes(countryCode)
      } else {
        return false
      }
    })
  }

  onPopupClose = () => {
    this.setState({ positionPopup: null })
  }

  render() {
    const { positionPopup, belongingExperiences } = this.state
    const { isUserLogged } = this.props
    const options = {
      type: 'slicer',
      data,
      idField: 'iso_a3',
      tooltip: ({ properties: { iso_a3 } }) => {
        const lang = i18nHelper.getCurrentLanguage()
        return isoCountries.getName(iso_a3, lang)
      },
      style: ({ iso_a3 }) => {
        let style = {
          color: '#EFEFEF',
          weight: 1,
          opacity: 0.85,
          fillColor: '#EFEFEF',
          fillOpacity: 0.2,
          fill: true,
          stroke: true
        }
        const belongingExperiences = this.belongingExperiences(iso_a3)

        if (size(belongingExperiences) > 0) {
          const publishedExperiences = reduce(
            belongingExperiences,
            (sum, experience) => {
              if (experience.published) {
                return sum + 1
              }

              return sum
            },
            0
          )

          style.fillColor = '#AAA'
          style.color = '#999999'

          if (publishedExperiences > 0) {
            style.opacity = 0.65
          } else {
            style.dashArray = '5,5,5'
            style.fillOpacity = 0.1
          }
        }

        return style
      },
      hoverStyle: ({ iso_a3 }) => {
        if (this.belongsToAnyExperience(iso_a3)) {
          return {
            color: '#E74525',
            fillColor: '#E74525',
            fillOpacity: 0.2
          }
        } else {
          return {}
        }
      },
      activeStyle: ({ iso_a3 }) => {
        if (this.belongsToAnyExperience(iso_a3)) {
          return {
            color: '#E74525',
            fillColor: '#E74525'
          }
        } else {
          return {}
        }
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
            onClick={this.onMapClick}
            style={{ backgroundColor: '#FFF' }}
            keyboard={true}
            minZoom={3}
            maxZoom={6}
            doubleClickZoom={true}
            boxZoom={true}
            dragging={true}
            attributionControl={false}
            scrollWheelZoom={false}
            touchZoom={true}
            center={[43, -3]}
            zoom={3}
            className="Experiences-map"
          >
            <VectorGrid {...options} onClick={this.onLayerClick} />
            {positionPopup && (
              <Popup position={positionPopup} autoPan={true} onClose={this.onPopupClose}>
                <ExperiencePopup experiences={belongingExperiences} isUserLogged={isUserLogged} />
              </Popup>
            )}
          </Map>
        ) : null}
      </Fragment>
    )
  }
}

export default ExperiencesMap
