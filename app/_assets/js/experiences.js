var $ = require('jquery');
var ExperiencesMapView = require('./experiences/experiences-map-view');

$(function () {
  var experiencesMapView = new ExperiencesMapView({
    el: $('.js-map'),
    experiences: window.experiences
  });
  experiencesMapView.render();
});
