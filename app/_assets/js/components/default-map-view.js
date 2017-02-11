var L = require('leaflet');
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var COUNTRIES_SQL = 'http://mochiling.carto.com/api/v2/sql?format=GeoJSON&q=SELECT ST_SIMPLIFY(the_geom, 0.3) as the_geom FROM world_borders';
var POLYGON_STYLE = {
  color: '#EFEFEF',
  weight: 1,
  opacity: 0.65
};

module.exports = Backbone.View.extend({

  render: function () {
    var map = L.map(this.el, {
      doubleClickZoom: false,
      boxZoom: false,
      dragging: false,
      attributionControl: false,
      scrollWheelZoom: false,
      touchZoom: false,
      keyboard: false
    }).setView([29.142566, -33.925781], 3);

    $.getJSON(COUNTRIES_SQL, function(data) {
      L.geoJson(data, {
        style: POLYGON_STYLE
      }).addTo(map);
    }.bind(this));

    return this;
  }
});