var Backbone = require('backbone');
require('select2');

module.exports = Backbone.View.extend({

  events: {
    'submit': '_onSubmit'
  },

  render: function () {
    this._initViews();
    return this;
  },

  _initViews: function () {
    this.$('.js-select').select2({
      minimumResultsForSearch: Infinity
    });
  },

  _onSubmit: function (ev) {
    ev.stopPropagation();
    ev.preventDefault();

  }

});