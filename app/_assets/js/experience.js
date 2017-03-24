var $ = require('jquery');
global.jQuery = $;
var ExperienceInstagramView = require('./experience/experience-instagram-view');
var ExperienceMapView = require('./experience/experience-map-view');
var ResponsiveHeaderHelper = require('./components/responsive-header');

$(function () {
  ResponsiveHeaderHelper($('.js-canvas'));

  var experiencesMapView = new ExperienceMapView({
    el: $('.js-map'),
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
