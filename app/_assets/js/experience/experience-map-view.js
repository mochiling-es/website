var L = require('leaflet');
var _ = require('underscore');
var Backbone = require('backbone');
var CountriesJSON = require('../countries.json');

var POLYGON_STYLE = {
  color: '#EFEFEF',
  weight: 0.7,
  opacity: 0.45
};
var POLYGON_HIGHLIGHTED_STYLE = {
  color: '#F88B52',
  weight: 0.8,
  opacity: 0.65
};

module.exports = Backbone.View.extend({

  initialize: function (opts) {
    if (!opts.experienceCountries) throw new Error('experience countries are needed');
    this._experienceCountries = opts.experienceCountries;
    this._center = opts.center;
    this._zoom = opts.zoom;
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
    }).setView(
      this._center || [43, -3],
      this._zoom || 7
    );

    var bounds = L.latLngBounds();

    L.geoJson(CountriesJSON, {
      onEachFeature: function (feature, layer) {
        var countryName = feature.properties.name;
        var belongsToThisExperience = _.contains(this._experienceCountries, countryName);
        if (belongsToThisExperience) {
          layer.setStyle(POLYGON_HIGHLIGHTED_STYLE);
          bounds.extend(layer.getBounds());
        } else {
          layer.setStyle(POLYGON_STYLE);
        }
      }.bind(this)
    }).addTo(map);

    if (!this._center) {
      map.fitBounds(bounds, { maxZoom: 10 });
    }

    return this;
  }
});
