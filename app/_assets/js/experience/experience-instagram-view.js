// var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Instafeed = require('instafeed.js');
var Freewall = require('freewall');

var INSTAGRAM_OPTS = {
  clientId: '8edddd77898d4100bfac8f4b58e54c25',
  accessToken: '9841730.ba4c844.3ce456308101453787eb5443d358c259',
  resolution: 'low_resolution',
  get: 'tagged',
  limit: 20
};
var IMAGE_TEMPLATE = '' +
  '<div class="cell" alt="{{caption}}" title="{{caption}}" style="width: {{width}}px; height: {{height}}px; background: url({{image}}) no-repeat;">' +
    '<a href="{{link}}" target="_blank" class="Instagram-item">' +
      // '<div class="Instagram-location Text Text--small Text--strong Color--light">' +
      //   '<i class="fa fa-map-marker u-rSpace"></i>' +
      //   '{{location}}' +
      // '</div>' +
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
          template: IMAGE_TEMPLATE,
          after: this._onImagesAdded.bind(this),
          success: function () {
            console.log(arguments);
          }
        },
        INSTAGRAM_OPTS
      )
    );
    feed.run();
  },

  _onImagesAdded: function () {
    this.$('.js-instagramLoader').remove();
    
    var wall = new Freewall.freewall('#instafeed');
    var fitOnResize = function () {
      wall.fitWidth();
    };
    wall.reset({
      selector: '.cell',
      animate: true,
      cellW: 306,
      fixSize: 0,
      onResize: fitOnResize
    });
    
    fitOnResize();
  }
});
