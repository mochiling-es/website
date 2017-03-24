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

module.exports = Backbone.View.extend({

  initialize: function (opts) {
    if (!opts.experienceCountries) throw new Error('experience countries are needed');
    this._experienceCountries = opts.experienceCountries;
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
    }).setView([43, -3], 7);

    var bounds = L.latLngBounds();

    L.geoJson(CountriesJSON, {
      onEachFeature: function (feature, layer) {
        var countryName = feature.properties.name;
        var belongsToThisExperience = _.contains(this._experienceCountries, countryName);
        if (belongsToThisExperience) {
          layer.setStyle(POLYGON_STYLE);
          bounds.extend(layer.getBounds());
        } else {
          layer.setStyle(POLYGON_STYLE);
        }
      }.bind(this)
    }).addTo(map);

    map.fitBounds(bounds, { maxZoom: 30 });

    return this;
  }
});