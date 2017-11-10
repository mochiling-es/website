var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
require('select2');
var TIME_AFTER_SUCCESS = 5000;

module.exports = Backbone.View.extend({

  events: {
    'keyup .js-email': '_onChange',
    'keyup .js-name': '_onChange',
    'focus .js-field': '_onFocus',
    'blur .js-field': '_onBlur',
    'keyup .js-description': '_onChange',
    'change .js-proposal': '_onChange',
    'submit': '_onSubmit'
  },

  initialize: function (opts) {
    if (!opts.buttonStates) throw new Error('button States are required');

    this._buttonStates = opts.buttonStates;
    this.model = new Backbone.Model({
      name: '',
      email: '',
      proposal: this.$('.js-proposal').val(),
      description: '',
      state: 'idle'
    });

    this._initBinds();
  },

  render: function () {
    var shouldDisableFields = this.model.get('state') === 'loading';
    var $email = this.$('.js-email');
    var $name = this.$('.js-name');
    var $select = this.$('.js-proposal');
    var $desc = this.$('.js-description');
    var $submit = this.$('.js-submit');

    var ELEMENTS = [$email, $name, $select, $desc];

    _.each(ELEMENTS, function ($el) {
      $el.prop('disabled', shouldDisableFields);
    });
    
    $submit.remove();
    this.$('.js-submitField').append(
      _.template(this._buttonStates)({
        state: this.model.get('state'),
        isValid: this._isValid()
      })
    )
    this._initViews();

    return this;
  },

  _initBinds: function () {
    this.listenTo(this.model, 'change', this.render);
  },

  _initViews: function () {
    this.$('.js-proposal').select2({
      minimumResultsForSearch: Infinity
    });
  },

  _isValid: function () {
    return !!this.model.get('name') &&
      !!this.model.get('email') &&
      !!this.model.get('proposal') &&
      !!this.model.get('description') &&
      this.model.get('state') !== 'loading';
  },

  _clearFields: function () {
    this.$('.js-email').val('');
    this.$('.js-name').val('');
    this.$('.js-proposal').val(0);
    this.$('.js-description').val('');
    this.$('.js-submit').val('');
    this.model.clear();
    this.model.set('state', 'success');

    setTimeout(function () {
      this.model.set('state', 'idle');
    }.bind(this), TIME_AFTER_SUCCESS);
  },

  _onChange: function () {
    this.model.set({
      name: this.$('.js-name').val(),
      email: this.$('.js-email').val(),
      proposal: this.$('.js-proposal').val(),
      description: this.$('.js-description').val()
    })
  },

  _onFocus: function (ev) {
    $(ev.target).closest('.js-field').addClass('Form-field--focus');
  },

  _onBlur: function (ev) {
    $(ev.target).closest('.js-field').removeClass('Form-field--focus');
  },

  _onSubmit: function (ev) {
    ev.stopPropagation();
    ev.preventDefault();

    if (this._isValid()) {
      this.model.set('state', 'loading');

      $.ajax({
        url: this.$el.attr('action'), 
        method: this.$el.attr('method'),
        data: _.omit(this.model.toJSON(), 'state'),
        dataType: 'json',
        success: function () {
          this._clearFields();
          this.model.set('state', 'success');
        }.bind(this),
        error: function () {
          this.model.set('state', 'error');
        }.bind(this)
      });
    }
  }

});