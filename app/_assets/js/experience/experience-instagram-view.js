var _ = require('underscore');
var Backbone = require('backbone');
var Instafeed = require('instafeed.js');
var INSTAGRAM_OPTS = {
  clientId: '8edddd77898d4100bfac8f4b58e54c25',
  accessToken: '9841730.ba4c844.3ce456308101453787eb5443d358c259',
  resolution: 'low_resolution',
  get: 'tagged',
  limit: 20
};
var IMAGE_TEMPLATE = '' +
  '<div class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-2 pure-u-lg-1-3">' +
    '<a href="{{link}}" class="Instagram-image" target="_blank">' +
      '<img src="{{image}}" class="pure-img" title="{{caption}}" alt="{{caption}}" />' +
      '<div class="Instagram-location Text Text--small Text--strong Color--light">' +
        '<i class="fa fa-map-marker u-rSpace"></i>' +
        '{{location}}' +
      '</div>' +
    '</a>' +
  '</div>';

module.exports = Backbone.View.extend({

  initialize: function (opts) {
    if (!opts.instagramTag) throw new Error('instagramId is required');

    this._instagramTag = opts.instagramTag;
  },

  render: function () {
    this._initViews();
    return this;
  },

  _initViews: function () {
    var feed = new Instafeed(
      _.extend(
        {
          tagName: this._instagramTag,
          template: IMAGE_TEMPLATE
        },
        INSTAGRAM_OPTS
      )
    );
    feed.run();
  }
});
