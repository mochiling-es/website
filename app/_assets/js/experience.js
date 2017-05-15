var $ = require('jquery');
global.jQuery = $;
var ExperienceInstagramView = require('./experience/experience-instagram-view');
var ExperienceMapView = require('./experience/experience-map-view');
var ResponsiveHeaderHelper = require('./components/responsive-header');
var CookiesView = require('./components/cookies-view');

$(function () {
  ResponsiveHeaderHelper($('.js-canvas'));
  new CookiesView({
    el: $('.js-cookies')
  }).render();

  var experiencesMapView = new ExperienceMapView({
    el: $('.js-map'),
    zoom: window.zoom,
    center: window.center,
    experienceCountries: window.experienceCountries
  });
  experiencesMapView.render();

  if (window.instagramTag && $('#instafeed').length) {
    var experienceInstagramView = new ExperienceInstagramView({
      el: $('#instafeed'),
      instagramTag: window.instagramTag
    });
    experienceInstagramView.render();
  }
});
