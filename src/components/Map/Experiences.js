import React, { Component, Fragment } from 'react'
import { filter, size, reduce, each } from 'lodash'
import dynamic from 'next/dynamic'
import isoCountries from 'i18n-iso-countries'

import data from './countries.json'
import ExperiencePopup from './ExperiencePopup'

let L

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
const GeoJSON = dynamic(
  () =>
    import('react-leaflet').then(mod => {
      return mod.GeoJSON
    }),
  {
    ssr: false
  }
)
const Popup = dynamic(
  () =>
    import('react-leaflet').then(mod => {
      return mod.Popup
    }),
  {
    ssr: false
  }
)

class ExperiencesMap extends Component {
  state = {
    positionPopup: null,
    belongingExperiences: []
  }

  componentDidMount = async () => {
    L = await import('leaflet')
    await import('leaflet-hash')
  }

  componentWillMount = async () => {
    each(['es', 'en'], lang => {
      isoCountries.registerLocale(require(`i18n-iso-countries/langs/${lang}.json`))
    })
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

  onLayerClick = ({ target, latlng }) => {
    const iso_a3 = target.feature.properties.iso_a3
    const belongingExperiences = this.belongingExperiences(iso_a3)
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
    const { isUserLogged, lang, i18n } = this.props

    const options = {
      data,
      onEachFeature: (feature, layer) => {
        const {
          properties: { iso_a3 }
        } = feature

        const belongingExperiences = this.belongingExperiences(iso_a3)

        layer.bindTooltip(isoCountries.getName(iso_a3, lang), {
          sticky: true,
          direction: 'auto',
          className: 'paco'
        })

        if (size(belongingExperiences) > 0) {
          layer.on('click', this.onLayerClick)
        }
      },
      style: ({ properties: { iso_a3 } }) => {
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
          <GeoJSON {...options} />
          {positionPopup && (
            <Popup position={positionPopup} autoPan={true} onClose={this.onPopupClose}>
              <ExperiencePopup i18n={i18n} lang={lang} experiences={belongingExperiences} isUserLogged={isUserLogged} />
            </Popup>
          )}
        </Map>
      </Fragment>
    )
  }
}

export default ExperiencesMap
