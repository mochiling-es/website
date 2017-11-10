var _ = require('underscore');
var Backbone = require('backbone');
var Instafeed = require('instafeed.js');

var INSTAGRAM_OPTS = {
  resolution: 'standard_resolution',
  get: 'user',
  limit: 8
};

var IMAGE_TEMPLATE = '' +
  '<a href="{{link}}" target="_blank" class="Banner-listItem">' +
    '<div class="Banner-info">' +
      '<img class="Banner-infoImage" title="{{caption}}" alt="{{caption}}" src="{{image}}" />' +
      '<div class="Banner-infoContent Text Text--withShadow Text--med Text--strong Color--light">' +
        '<i class="fa fa-map-marker u-lSpace--m u-rSpace"></i>' +
        '{{location}}' +
        '<i class="fa fa-heart u-lSpace--m u-rSpace"></i>' +
        '{{likes}}' +
        '<i class="fa fa-comment u-lSpace--m u-rSpace"></i>' +
        '{{comments}}' +
      '</div>' +
    '</div>' +
  '</a>';

module.exports = Backbone.View.extend({

  initialize: function (opts) {
    if (!opts.instagramId) throw new Error('instagramId is required');
    if (!opts.instagramConfig) throw new Error('instagram config is required');

    this._instagramId = opts.instagramId;
    this._instagramConfig = opts.instagramConfig;
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
          template: IMAGE_TEMPLATE,
          success: this._afterImageSuccess.bind(this),
          after: this._afterImageAdded.bind(this)
        },
        INSTAGRAM_OPTS,
        this._instagramConfig
      )
    );
    feed.run();
  },

  _afterImageSuccess: function (info) {
    this._imageLocation = info.data[0].location;
  },

  _afterImageAdded: function () {
    this.$('.js-instagramLoader').remove();
    if (!this._imageLocation) {
      this.$('.fa-map-marker').remove();
    }
  }
});
