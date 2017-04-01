var L = require('leaflet');
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var CountriesJSON = require('../countries.json');
var POLYGON_STYLE = {
  color: '#EFEFEF',
  weight: 1,
  opacity: 0.65
};
var DEFAULT_OPTS = {
  center: [29.142566, -33.925781],
  zoom: 3
}

module.exports = Backbone.View.extend({

  initialize: function (opts) {
    this._center = opts.center || DEFAULT_OPTS.center;
    this._zoom = opts.zoom || DEFAULT_OPTS.zoom;
  },

  render: function () {
    var map = L.map(this.el, {
      doubleClickZoom: false,
      boxZoom: false,
      dragging: false,
      attributionControl: false,
      scrollWheelZoom: false,
      zoomControl: false,
      touchZoom: false,
      keyboard: false
    }).setView(this._center, this._zoom);

    L.geoJson(CountriesJSON, {
      style: POLYGON_STYLE
    }).addTo(map);

    return this;
  }
});