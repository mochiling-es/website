var $ = require('jquery');
var MemberMapView = require('./member/member-map-view');
var MemberInstagramView = require('./member/member-instagram-view');

$(function(){
  var visitedCountries = window.visitedCountries;
  var bornLocation = window.bornLocation;
  var instagramId = window.instagramId;

  if (!visitedCountries) throw new Error('visitedCountries is required');
  if (!bornLocation) throw new Error('bornLocation is required');
  
  var memberMap = new MemberMapView({
    el: $('#js-map'),
    visitedCountries: visitedCountries,
    bornLocation: bornLocation
  });

  memberMap.render();

  if (instagramId && $('#instafeed').length) {
    var memberInstagram = new MemberInstagramView({
      el: $('#instafeed'),
      instagramId: instagramId
    });
    memberInstagram.render();
  }
});