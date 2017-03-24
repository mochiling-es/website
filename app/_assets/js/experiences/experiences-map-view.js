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
  limit: 300
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

    L.geoJson(CountriesJSON, {
      onEachFeature: onEachFeature.bind(this)
    }).addTo(this._map);

    this._getPhotos();
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
        INSTAGRAM_OPTS,
        this._instagramConfig
      )
    );
    feed.run();
  },

  _onSuccessPhotos: function (photos) {
    var markers = photos.data;
    this._addPhotos(markers);
  },

  _addPhotos: function (photos) {
    setTimeout(function () {
      var nextPhoto = photos.shift();
      this._addPhoto(nextPhoto);
      if (photos.length) {
        this._addPhotos(photos);  
      }
    }.bind(this), TIME_BETWEEN_MARKERS_APPEAR)
  },

  _addPhoto: function (marker) {
    if (marker.location) {
      var circleMarker = new PhotoMarker(marker);
      circleMarker.addTo(this._map);
      var path = circleMarker.getElement();
      $(path).addClass('Experience-instagramMarker');
    }
  },

  _belongsToAnyExperience: function (countryName) {
    return _.find(this._experiences, function (experience) {
      return _.contains(experience.countries, countryName);
    });
  },

  _setMapState: function () {
    var currentState = this.model.get('state');

    this._$mobile
      .removeClass('in-map in-page')
      .addClass(
        currentState === 'map'? 'in-map' : 'in-page'
      );

    if (currentState === 'map') {
      $('body').animate({
        scrollTop: 0
      });
    }

    this._$title.toggle(currentState === 'page');
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
