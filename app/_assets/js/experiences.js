var $ = require('jquery');
var ExperiencesMapView = require('./experiences/experiences-map-view');
var ResponsiveHeaderHelper = require('./components/responsive-header');

$(function () {
  ResponsiveHeaderHelper($('.js-canvas'));

  var experiencesMapView = new ExperiencesMapView({
    el: $('.js-map'),
    experiences: window.experiences
  });
  experiencesMapView.render();
});
