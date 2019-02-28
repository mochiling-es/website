import React, { Component, Fragment } from 'react'
import { isMobile } from 'react-device-detect'
import { filter, size } from 'lodash'

import data from '../../../static/assets/data/countries.json'

import '../../styles/vendor/leaflet.scss'

let Map, VectorGridDefault, VectorGrid, Popup

class ExperiencesMap extends Component {
  state = {
    showMap: false,
    positionPopup: null,
    state: isMobile ? 'page' : 'map'
  }

  componentDidMount = () => {
    let RL = require('react-leaflet')
    Map = RL.Map
    Popup = RL.Popup
    const withLeaflet = RL.withLeaflet
    VectorGridDefault = require('react-leaflet-vectorgrid')
    VectorGrid = withLeaflet(VectorGridDefault)

    this.setState({ showMap: true })
  }

  componentDidUpdate = () => {
    if (!this.map) {
      return
    }

    // this._map._hash = new L.Hash(this._map);
  }

  onClick = ({ layer, latlng }) => {
    if (this.belongsToAnyExperience(layer.properties.ISO_A3)) {
      this.setState({ positionPopup: [latlng.lat, latlng.lng] })
    } else {
      console.log('oh!')
    }
  }

  belongsToAnyExperience = countryCode => {
    const { experiences } = this.props
    return (
      size(
        filter(experiences, function(experience) {
          return experience.countries && experience.countries.includes(countryCode)
        })
      ) > 0
    )
  }

  onPopupClose = () => {
    this.setState({ positionPopup: null })
  }

  render() {
    const { positionPopup } = this.state

    const options = {
      type: 'slicer',
      data,
      idField: 'ISO_A3',
      tooltip: 'ADMIN',
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
        if (this.belongsToAnyExperience(ISO_A3)) {
          style.opacity = 0.65
          style.fillColor = '#AAA'
          style.color = '#999999'
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
                <div>paco</div>
              </Popup>
            )}
          </Map>
        ) : null}
      </Fragment>
    )
  }
}

export default ExperiencesMap

/*

var L = require('leaflet');
require('leaflet-hash');
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Instafeed = require('instafeed.js');
var PhotoMarker = require('./photo-marker-view');
var experiencePolygon = require('./experience-polygon-view');
var CountriesJSON = require('../countries.json');
var isMobileDevice = require('ismobilejs');
var TIME_BETWEEN_MARKERS_APPEAR = 150;

var INSTAGRAM_OPTS = {
  resolution: 'thumbnail',
  get: 'tagged',
  sortBy: 'random',
  limit: 1000
};

var POLYGON_STYLE = {
  color: '#EFEFEF',
  weight: 1,
  opacity: 0.65
};

module.exports = Backbone.View.extend({

  initialize: function (opts) {
    if (!opts.experiences) throw new Error('experiences is required');
    if (!opts.$title) throw new Error('title element is not provided');
    if (!opts.$mobile) throw new Error('mobile element is not provided');
    if (!opts.instagramConfig) throw new Error('instagram config is required');

    this._experiences = opts.experiences;
    this._$title = opts.$title;
    this._$mobile = opts.$mobile;
    this._instagramConfig = opts.instagramConfig;

    this.model = new Backbone.Model({
      state: isMobileDevice.any ? 'page' : 'map'
    });

    this._initBinds();
  },

  render: function () {
    this._initMap();

    if (isMobileDevice.any) {
      this._initMobileStuff();
    }

    return this;
  },

  _initBinds: function () {
    this.listenTo(this.model, 'change:state', this._setMapState);
  },

  _initMap: function () {
    this._map = L.map(this.el, {
      doubleClickZoom: true,
      boxZoom: true,
      dragging: true,
      attributionControl: false,
      scrollWheelZoom: false,
      touchZoom: true,
      keyboard: true,
      minZoom: 3,
      maxZoom: 6
    }).setView([43, -3], 3, false);

    this._map._hash = new L.Hash(this._map);

    if (!isMobileDevice.any) {
      this._map.once('popupopen', this._hideTitle.bind(this));
    }

    function onEachFeature(feature, layer) {
      var countryName = feature.properties.name;
      var experiences = this._belongsToAnyExperience(countryName);
      if (experiences.length > 0) {
        experiencePolygon(layer, this._map, experiences, countryName);
      } else {
        layer.setStyle(POLYGON_STYLE);
      }
    }

    L.geoJson(CountriesJSON, {
      onEachFeature: onEachFeature.bind(this)
    }).addTo(this._map);
  },

  _setMapState: function () {
    var currentState = this.model.get('state');

    this._$mobile
      .removeClass('in-map in-page')
      .addClass(
        currentState === 'map' ? 'in-map' : 'in-page'
      );

    if (currentState === 'map') {
      $('body').animate({
        scrollTop: 0
      });
    }

    this._$title.toggle(currentState === 'page');
  },

  _hideTitle: function () {
    this._$title.fadeOut();
  },

  _initMobileStuff: function () {
    this._setMapState();

    this._$mobile.find('.js-navigate').on('click', function () {
      this.model.set('state', 'map');
    }.bind(this));

    this._$mobile.find('.js-mapMobileBack').on('click', function () {
      this.model.set('state', 'page');
    }.bind(this));
  }
});
*/
