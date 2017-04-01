var $ = require('jquery');
var ExperiencesMapView = require('./experiences/experiences-map-view');

$(function () {
  var experiencesMapView = new ExperiencesMapView({
    el: $('.js-map'),
    $title: $('.js-title'),
    $mobile: $('.js-mapMobile'),
    instagramConfig: window.instagramConfig,
    experiences: window.experiences,
    link: false
  });
  experiencesMapView.render();
});
