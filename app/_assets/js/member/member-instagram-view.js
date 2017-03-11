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
var IMAGE_TEMPLATE = '' +
  '<a href="{{link}}" target="_blank">' +
    '<img class="pure-img" title="{{caption}}" alt="{{caption}}" src="{{image}}" />' +
    '<div class="Member-instagramImageInfo Text Text--med Text--strong Color--light">' +
      '<i class="fa fa-map-marker u-lSpace--m u-rSpace"></i>' +
      '{{location}}' +
      '<i class="fa fa-heart u-lSpace--m u-rSpace"></i>' +
      '{{likes}}' +
      '<i class="fa fa-comment u-lSpace--m u-rSpace"></i>' +
      '{{comments}}' +
    '</div>' +
  '</a>';

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
          template: IMAGE_TEMPLATE,
          after: this._afterImageAdded.bind(this)
        },
        INSTAGRAM_OPTS
      )
    );
    feed.run();
  },

  _afterImageAdded: function () {
    this.$('.js-instagramLoader').remove();
  }
});
