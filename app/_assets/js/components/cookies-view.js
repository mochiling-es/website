var Backbone = require('backbone');
var LocalStorage = require('local-storage');

// Cookies element?

module.exports = Backbone.View.extend({

  events: {
    'click .js-cookiesButton': '_onClick'
  },

  render: function () {
    if (!LocalStorage('mochiling.cookies')) {
      this.$el.removeClass('u-hidden');
    }
    return this;
  },

  _onClick: function () {
    LocalStorage('mochiling.cookies', true);
    this.remove();
  }
});
