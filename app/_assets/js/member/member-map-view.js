var L = require('leaflet');
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var COUNTRIES_SQL = 'http://mochiling.carto.com/api/v2/sql?format=GeoJSON&q=SELECT ST_SIMPLIFY(the_geom, 0.2) as the_geom, name FROM world_borders';
var POLYGON_STYLE = {
  color: '#EFEFEF',
  weight: 1,
  opacity: 0.65
};
var MARKER_STYLE = {
  radius: 6,
  fillColor: '#F88B52',
  color: '#FFFFFF',
  weight: 4,
  opacity: 0.5,
  fillOpacity: 1
};

module.exports = Backbone.View.extend({

  initialize: function (opts) {
    if (!opts.visitedCountries) throw new Error('visitedCountries is required');
    if (!opts.bornLocation) throw new Error('bornLocation is required');

    this._visitedCountries = opts.visitedCountries;
    this._bornLocation = opts.bornLocation;
    this._centerMap = this._centerMap.bind(this);
  },

  render: function () {
    this._map = L.map(this.el, {
      doubleClickZoom: false,
      boxZoom: false,
      dragging: false,
      attributionControl: false,
      scrollWheelZoom: false,
      zoomControl: false,
      touchZoom: false,
      keyboard: false
    }).setView(this._bornLocation, 3, false);

    this._centerMap();

    $.getJSON(COUNTRIES_SQL, function (data) {
      L.geoJson(data, {
        style: function (feature) {
          var opts = _.clone(POLYGON_STYLE);
          var countryName = feature.properties.name;

          if (_.contains(this._visitedCountries, countryName)) {
            opts.color = '#CDCDCD';
            opts.weight = 1.5;
          }

          return opts;
        }.bind(this)
      }).addTo(this._map);

      L.circleMarker(this._bornLocation, MARKER_STYLE).addTo(this._map);
    }.bind(this));

    return this;
  },

  _centerMap: function () {
    var windowWidth = window.innerWidth;
    var mapHeight = this.$el.innerHeight();

    var moveX = 0;
    var moveY = (mapHeight / 2) - 380;

    if (windowWidth > 720) {
      moveX = 200;
    } else if (windowWidth > 320) {
      moveX = (windowWidth / 2) / 2;
    } else {
      moveX = 0;
    }

    this._map.panBy([moveX, moveY]);
  }
});
