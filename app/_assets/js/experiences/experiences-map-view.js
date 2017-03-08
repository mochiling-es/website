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

module.exports = Backbone.View.extend({

  initialize: function (opts) {
    if (!opts.experiences) throw new Error('experiences is required');

    this._experiences = opts.experiences;
  },

  render: function () {
    this._map = L.map(this.el, {
      doubleClickZoom: false,
      boxZoom: false,
      dragging: true,
      attributionControl: false,
      scrollWheelZoom: false,
      touchZoom: false,
      keyboard: false,
      minZoom: 3,
      maxZoom: 3
    }).setView([43, -3], 3, false);

    $.getJSON(COUNTRIES_SQL, function (data) {
      L.geoJson(data, {
        style: function (feature) {
          var opts = _.clone(POLYGON_STYLE);
          // var countryName = feature.properties.name;

          // if (_.contains(this._experiences, countryName)) {
          //   opts.color = '#CDCDCD';
          //   opts.weight = 1.5;
          // }

          return opts;
        }
      }).addTo(this._map);
    }.bind(this));

    return this;
  }
});
