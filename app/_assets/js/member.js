var $ = require('jquery');
var MemberMapView = require('./member/member-map-view');
var MemberInstagramView = require('./member/member-instagram-view');
var ResponsiveHeaderHelper = require('./components/responsive-header');
var CookiesView = require('./components/cookies-view');

$(function () {
  var visitedCountries = window.visitedCountries;
  var bornLocation = window.bornLocation;
  var instagramId = window.instagramId;
  var instagramConfig = window.instagramConfig;

  if (!visitedCountries) throw new Error('visitedCountries is required');
  if (!bornLocation) throw new Error('bornLocation is required');

  ResponsiveHeaderHelper($('.js-canvas'));
  new CookiesView({
    el: $('.js-cookies')
  }).render();

  var memberMap = new MemberMapView({
    el: $('#js-map'),
    visitedCountries: visitedCountries,
    bornLocation: bornLocation
  });

  memberMap.render();

  if (instagramId && $('#instafeed').length) {
    var memberInstagram = new MemberInstagramView({
      el: $('#instafeed'),
      instagramId: instagramId,
      instagramConfig: instagramConfig
    });
    memberInstagram.render();
  }
});
