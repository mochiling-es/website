var $ = require('jquery');
var MemberMapView = require('./member-map-view');
var Instafeed = require('instafeed.js');

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

  if (instagramId) {
    var feed = new Instafeed({
      get: 'user',
      limit: 1,
      userId: instagramId,
      clientId: '8edddd77898d4100bfac8f4b58e54c25',
      accessToken: '9841730.ba4c844.3ce456308101453787eb5443d358c259',
      resolution: 'standard_resolution',
      after: function () {
        $('#instafeed img').addClass('pure-img');
        console.log(arguments);
      }
    });
    feed.run();
  }
});