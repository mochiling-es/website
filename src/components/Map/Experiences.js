import React, { Component, Fragment } from 'react'
import { filter, size, reduce, each } from 'lodash'
import isoCountries from 'i18n-iso-countries'

import data from '../../../static/assets/data/countries.json'
import ExperiencePopup from './ExperiencePopup'
import { i18nHelper } from '../i18n'

let Map, VectorGridDefault, VectorGrid, Popup

class ExperiencesMap extends Component {
  state = {
    showMap: false,
    positionPopup: null,
    belongingExperiences: []
  }

  componentDidMount = () => {
    let RL = require('react-leaflet')
    Map = RL.Map
    Popup = RL.Popup
    const withLeaflet = RL.withLeaflet
    VectorGridDefault = require('react-leaflet-vectorgrid')
    VectorGrid = withLeaflet(VectorGridDefault)

    each(i18nHelper.supportLangs, lang => {
      isoCountries.registerLocale(require(`i18n-iso-countries/langs/${lang}.json`))
    })

    this.setState({ showMap: true })
  }

  componentDidUpdate = () => {
    if (!this.map) {
      return
    }

    // new L.Hash(this.map)
  }

  onClick = ({ layer, latlng }) => {
    const belongingExperiences = this.belongingExperiences(layer.properties.ISO_A3)
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
    const options = {
      type: 'slicer',
      data,
      idField: 'ISO_A3',
      tooltip: ({ properties: { ISO_A3 } }) => {
        const lang = i18nHelper.getCurrentLanguage()
        return isoCountries.getName(ISO_A3, lang)
      },
      style: ({ ISO_A3 }) => {
        let style = {
          color: '#EFEFEF',
          weight: 1,
          opacity: 0.85,
          fillColor: '#EFEFEF',
          fillOpacity: 0.2,
          fill: true,
          stroke: true
        }
        const belongingExperiences = this.belongingExperiences(ISO_A3)

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
            style.opacity = 0.33
            style.fillOpacity = 0.1
          }
        }

        return style
      },
      hoverStyle: ({ ISO_A3 }) => {
        if (this.belongsToAnyExperience(ISO_A3)) {
          return {
            color: '#E74525',
            fillColor: '#E74525',
            fillOpacity: 0.2
          }
        } else {
          return {}
        }
      },
      activeStyle: ({ ISO_A3 }) => {
        if (this.belongsToAnyExperience(ISO_A3)) {
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
              this.map = node
            }}
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
            <VectorGrid {...options} onClick={this.onClick} />
            {positionPopup && (
              <Popup position={positionPopup} autoPan={true} onClose={this.onPopupClose}>
                <ExperiencePopup experiences={belongingExperiences} />
              </Popup>
            )}
          </Map>
        ) : null}
      </Fragment>
    )
  }
}

export default ExperiencesMap
