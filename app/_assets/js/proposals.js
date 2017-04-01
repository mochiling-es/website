var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var DefaultMapView = require('./components/default-map-view');
var ResponsiveHeaderHelper = require('./components/responsive-header');
var CookiesView = require('./components/cookies-view');

$(function () {
  ResponsiveHeaderHelper($('.js-canvas'));
  new CookiesView({
    el: $('.js-cookies')
  }).render();

  var defaultMap = new DefaultMapView({
    el: $('#js-map')
  });

  defaultMap.render();

  var proposals = window.proposals;

  var setRoute = function (proposalNumber) {
    if (_.isNaN(proposalNumber) || proposalNumber > 3 || proposalNumber < 1) {
      proposalNumber = 1;
    }
    var proposal = proposals[proposalNumber - 1];
    
    // On proposal click, we have to change
    // - proposal selected
    $('.js-navItem').removeClass('is-selected');
    $('.js-navItem' + proposalNumber).addClass('is-selected');
    // - desc
    $('.js-itemDesc').html(proposal.desc);
    // - contact link
    var link = $('.js-itemContactUrl').attr('href').slice(0, -1);
    $('.js-itemContactUrl').attr('href', link + proposalNumber);
    // - sub text
    $('.js-itemSub').html(proposal.sub);
    // - features availables
    $('.js-feature').addClass('is-disabled');
    _.each(proposal.features, function (feature) {
      $('.js-feature-' + feature).removeClass('is-disabled');
    });
  };

    // Initiate the router
  var AppRouter = Backbone.Router.extend({
    routes: {
      "*proposal": setRoute
    }
  });

  var router = new AppRouter();
  Backbone.history.start();
});