var $ = require('jquery');
var DefaultMapView = require('./components/default-map-view');
var ResponsiveHeaderHelper = require('./components/responsive-header');

$(function () {
  ResponsiveHeaderHelper($('.js-canvas'));

  var defaultMap = new DefaultMapView({
    el: $('#js-map'),
    center: [0, 0]
  });

  defaultMap.render();
});