var L = require('leaflet');
require('leaflet-hash');
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Instafeed = require('instafeed.js');
var PhotoMarker = require('./photo-marker-view');
var experiencePolygon = require('./experience-polygon-view');

var INSTAGRAM_OPTS = {
  clientId: '8edddd77898d4100bfac8f4b58e54c25',
  accessToken: '9841730.ba4c844.3ce456308101453787eb5443d358c259',
  resolution: 'thumbnail',
  get: 'tagged',
  sortBy: 'random',
  limit: 300
};

var COUNTRIES_SQL = 'http://mochiling.carto.com/api/v2/sql?format=GeoJSON&q=SELECT ST_SIMPLIFY(the_geom, 0.2) as the_geom, name FROM world_borders';

var POLYGON_STYLE = {
  color: '#EFEFEF',
  weight: 1,
  opacity: 0.65
};

module.exports = Backbone.View.extend({

  initialize: function (opts) {
    if (!opts.experiences) throw new Error('experiences is required');

    this._experiences = opts.experiences;
  },

  render: function () {
    this._initMap();
    return this;
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

    var hash = new L.Hash(this._map);

    function onEachFeature(feature, layer) {
      var countryName = feature.properties.name;
      var experience = this._belongsToAnyExperience(countryName);
      if (experience) {
        experiencePolygon(layer, experience);
      } else {
        layer.setStyle(POLYGON_STYLE);
      }
    }

    $.getJSON(COUNTRIES_SQL, function (data) {
      L.geoJson(data, {
        onEachFeature: onEachFeature.bind(this)
      }).addTo(this._map);

      this._getPhotos();
    }.bind(this));
  },

  _getPhotos: function () {
    var feed = new Instafeed(
      _.extend(
        {
          tagName: 'mochiling',
          template: '',
          success: this._onSuccessPhotos.bind(this),
          filter: function(image) {
            return !!image.location;
          }
        },
        INSTAGRAM_OPTS
      )
    );
    feed.run();
  },

  _onSuccessPhotos: function (photos) {
    var markers = photos.data;
    
    _.each(markers, function (marker) {
      if (marker.location) {
        var circleMarker = new PhotoMarker(marker);
        circleMarker.addTo(this._map);
      }
    }, this);
    
  },

  _belongsToAnyExperience: function (countryName) {
    return _.find(this._experiences, function (experience) {
      return _.contains(experience.countries, countryName);
    });
  }
});
