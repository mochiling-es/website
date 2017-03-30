var $ = require('jquery');
var DefaultMapView = require('./components/default-map-view');
var ResponsiveHeaderHelper = require('./components/responsive-header');
var ContactFormView = require('./contact/contact-form-view');

$(function () {
  ResponsiveHeaderHelper($('.js-canvas'));

  var defaultMap = new DefaultMapView({
    el: $('#js-map')
  }).render();

  var contactFormView = new ContactFormView({
    el: $('.js-form'),
    buttonStates: window.buttonStates
  }).render();
});