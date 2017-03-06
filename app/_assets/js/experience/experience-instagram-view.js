var _ = require('underscore');
var Backbone = require('backbone');
var Instafeed = require('instafeed.js');
var INSTAGRAM_OPTS = {
  clientId: '8edddd77898d4100bfac8f4b58e54c25',
  accessToken: '9841730.ba4c844.3ce456308101453787eb5443d358c259',
  resolution: 'standard_resolution',
  get: 'tagged',
  limit: 20
};
var imageTemplate = _.template(
  '<li class="pure-u-1-2"><a href="{{link}}"><img src="{{image}}" /></a></li>'
);

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
          after: this._afterImageAdded.bind(this),
          success: this._afterImageSuccess.bind(this),
          template: imageTemplate
        },
        INSTAGRAM_OPTS
      )
    );
    feed.run();
  },

  _afterImageAdded: function () {
    this.$('img').addClass('pure-img');
  },

  _afterImageSuccess: function (photos) {}
});