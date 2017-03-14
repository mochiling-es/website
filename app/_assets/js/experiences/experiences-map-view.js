var L = require('leaflet');
require('leaflet-hash');
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Instafeed = require('instafeed.js');

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

var HIGHLIGHT_STYLE = {
  color: '#AAA',
  weight: 1.5,
  opacity: 0.65
};

var CIRCLE_STYLE = {
  radius: 4,
  color: '#F88B52',
  fillColor: '#FFF',
  weight: 1,
  opacity: 0.6,
  fillOpacity: 0.6
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
        layer.setStyle(HIGHLIGHT_STYLE);

        layer.on('click', function () {
          window.location = experience.link;
        });
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
        console.log(marker);
        var location = [marker.location.latitude, marker.location.longitude];
        var imageUrl = marker.images.thumbnail.url;
        var imageLink = marker.link;
        var circleMarker = new L.circleMarker(location, CIRCLE_STYLE);
        circleMarker.bindPopup("<a target='_blank' href='" + imageLink + "'><img src='" + imageUrl + "' width=150 /></a>");
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
