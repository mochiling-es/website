var $ = require('jquery');
var DefaultMapView = require('./components/default-map-view');
var ResponsiveHeaderHelper = require('./components/responsive-header');
var SimpleBar = require('SimpleBar');

$(function () {
  ResponsiveHeaderHelper($('.js-canvas'));

  var defaultMap = new DefaultMapView({
    el: $('#js-map'),
    center: [0, 0]
  });

  defaultMap.render();

  if ($('.js-itemsList').length > 0) {
  	new SimpleBar($('.js-itemsList')[0]);	
  }
});