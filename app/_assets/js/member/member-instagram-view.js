var _ = require('underscore');
var Backbone = require('backbone');
var Instafeed = require('instafeed.js');
var INSTAGRAM_OPTS = {
  clientId: '8edddd77898d4100bfac8f4b58e54c25',
  accessToken: '9841730.ba4c844.3ce456308101453787eb5443d358c259',
  resolution: 'standard_resolution',
  get: 'user',
  limit: 1
};
var locationTemplate = _.template(
  '<div class="Member-instagramLocation Text Text--med Text--strong Color--light">'+
    '<i class="fa fa-map-marker u-rSpace"></i>'+
    '<a href="https://www.instagram.com/explore/locations/<%- placeId %>" target="_blank">'+
      '<%- name %>'+
    '</a>'+
  '</div>'
);

module.exports = Backbone.View.extend({

  initialize: function (opts) {
    if (!opts.instagramId) throw new Error('instagramId is required');

    this._instagramId = opts.instagramId;
  },

  render: function () {
    this._initViews();
    return this;
  },

  _initViews: function () {
    var feed = new Instafeed(
      _.extend(
        {
          userId: this._instagramId,
          after: this._afterImageAdded.bind(this),
          success: this._afterImageSuccess.bind(this)
        },
        INSTAGRAM_OPTS
      )
    );
    feed.run();
  },

  _afterImageAdded: function () {
    this.$('img').addClass('pure-img');
  },

  _afterImageSuccess: function (photos) {
    if (photos.data[0] && photos.data[0].location) {
      var location = photos.data[0].location;
      this.$el.append(
        locationTemplate({
          name: location.name,
          placeId: location.id
        })
      );
    }
  }
});