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
  fillColor: "#F88B52",
  color: "#FFFFFF",
  weight: 4,
  opacity: 0.5,
  fillOpacity: 1
}

module.exports = Backbone.View.extend({

  initialize: function (opts) {
    if (!opts.visitedCountries) throw new Error('visitedCountries is required');
    if (!opts.bornLocation) throw new Error('bornLocation is required');

    this._visitedCountries = opts.visitedCountries;
    this._bornLocation = opts.bornLocation;
  },

  render: function () {
    var map = L.map(this.el, {
      doubleClickZoom: false,
      boxZoom: false,
      dragging: false,
      attributionControl: false,
      scrollWheelZoom: false,
      touchZoom: false,
      keyboard: false
    }).setView(this._bornLocation, 3);

    // TODO: make it responsive!
    map.panBy([200, 100]);

    $.getJSON(COUNTRIES_SQL, function(data) {
      L.geoJson(data, {
        style: function(feature) {
          var opts = _.clone(POLYGON_STYLE);
          var countryName = feature.properties.name;

          if (_.contains(this._visitedCountries, countryName)) {
            opts.color = '#CDCDCD';
            opts.weight = 1.5;
          }

          return opts;
        }.bind(this)
      }).addTo(map);

      L.circleMarker(bornLocation, MARKER_STYLE).addTo(map);
    }.bind(this));

    return this;
  }
});