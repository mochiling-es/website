var Backbone = require('backbone');
var _ = require('underscore');
var arrowsTemplate = _.template(
  '<button type="button" class="Popup-arrow Popup-arrow--left js-left">' +
    '<i class="fa fa-angle-left"></i>' +
  '</button>' +
  '<button type="button" class="Popup-arrow Popup-arrow--right js-right">' +
    '<i class="fa fa-angle-right"></i>' +
  '</button>'
);
var contentTemplate = _.template(
    '<% if (experienceLink) { %>' +
      '<a href="<%- experienceLink %>">' +
    '<% } else { %>' +
      '<div>' +
    '<% } %>' +
      '<img class="Popup-author u-rSpace" src="/img/members/<%- authorImage %>" title="<%- authorName %>" alt="<%- authorName %>" />' +
      '<div class="Popup-image">' +
        '<i class="fa fa-circle-o-notch fa-2x fa-spin Color--emphasis Popup-imageLoader"></i>' +
        '<img src="<%- imageUrl %>" alt="<%- title %>" title="<%- title %>" />' +
      '</div>' +
      '<div class="Popup-info Text">' +
        '<h4 class="Text--large Color--secondary"><%- title %><i class="fa fa-link Popup-link u-lSpace"></i></h4>' +
        '<p class="Text--med Color--paragraph u-tSpace--m"><%- desc %></p>' +
      '</div>' +
    '<% if (experienceLink) { %>' +
      '</a>' +
    '<% } else { %>' +
      '</div>' +
    '<% } %>'
);

module.exports = Backbone.View.extend({

  events: {
    'click .js-left': '_goLeft',
    'click .js-right': '_goRight'
  },

  className: 'Popup js-popup Popup--vertical',

  initialize: function (opts) {
    if (!opts || !opts.experiencesData) throw new Error('experiencesData is needed');

    var randomIndex = Math.floor(Math.random() * opts.experiencesData.length);
    this.model = new Backbone.Model({ index: randomIndex });
    this.listenTo(this.model, 'change:index', this.render);
    this.experiencesData = opts.experiencesData;
  },

  render: function () {
    var currentIndex = this.model.get('index');
    var data = this.experiencesData[currentIndex];

    this.$el.empty();

    this.$el.html(
      contentTemplate({
        experienceLink: data.link,
        imageUrl: data.image,
        title: data.title,
        author: data.author,
        authorName: data.authorName,
        authorLink: data.authorLink,
        authorImage: data.authorImage,
        desc: this.experiencesData[currentIndex].short_desc
      })
    );

    if (this._isThereMoreThanOneExperience()) {
      this.$el.append(arrowsTemplate());
    }

    return this;
  },

  _isThereMoreThanOneExperience: function () {
    return this.experiencesData.length > 1;
  },

  _goRight: function (ev) {
    ev.stopPropagation();

    var currentIndex = this.model.get('index');
    var index;

    if (currentIndex === (this.experiencesData.length - 1)) {
      index = 0;
    } else {
      index = currentIndex + 1;
    }

    this.model.set('index', index);
  },

  _goLeft: function (ev) {
    ev.stopPropagation();

    var currentIndex = this.model.get('index');
    var index;

    if (currentIndex === 0) {
      index = this.experiencesData.length - 1;
    } else {
      index = currentIndex - 1;
    }

    this.model.set('index', index);
  }

});
