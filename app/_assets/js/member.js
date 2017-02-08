var $ = require('jquery');
var MemberMapView = require('./member-map-view');


$(function(){
  var visitedCountries = window.visitedCountries;
  var bornLocation = window.bornLocation;

  if (!visitedCountries) throw new Error('visitedCountries is required');
  if (!bornLocation) throw new Error('bornLocation is required');
  
  var memberMap = new MemberMapView({
    el: $('#js-map'),
    visitedCountries: visitedCountries,
    bornLocation: bornLocation
  });

  memberMap.render();
});