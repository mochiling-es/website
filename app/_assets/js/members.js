var $ = require('jquery');
var DefaultMapView = require('./components/default-map-view');

$(function(){
  var defaultMap = new DefaultMapView({
    el: $('#js-map')
  });

  defaultMap.render();
});