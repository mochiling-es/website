var Backbone = require('backbone');
var $ = require('jquery');
var LocalStorage = require('local-storage');

module.exports = Backbone.View.extend({

  events: {
    'click .js-close': '_onClick'
  },

  initialize: function (opts) {
    this.videoID = opts.videoID
  },

  render: function () {
    if (!LocalStorage('mochiling.embed-video')) {
      var $container = $('<div>').addClass('EmbedVideo')
      var $video = $('<iframe src="https://www.youtube.com/embed/' + this.videoID + '?rel=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>')
      var $button = $('<button>')
        .addClass('EmbedVideo-button js-close')
        .html('<i class="fa fa-close"></i>')

      $container.append($video)
      $container.append($button)

      this.$el.append($container);
    }

    return this;
  },

  _onClick: function () {
    LocalStorage('mochiling.embed-video', true);
    this.remove();
  }
});