var $ = require('jquery');
var ExperiencesMapView = require('./experiences/experiences-map-view');
var ResponsiveHeaderHelper = require('./components/responsive-header');
var CookiesView = require('./components/cookies-view');

$(function () {
  ResponsiveHeaderHelper($('.js-canvas'));
  new CookiesView({
    el: $('.js-cookies')
  }).render();

  var experiencesMapView = new ExperiencesMapView({
    el: $('.js-map'),
    $title: $('.js-title'),
    $mobile: $('.js-mapMobile'),
    instagramConfig: window.instagramConfig,
    experiences: window.experiences
  });
  experiencesMapView.render();
});
