var $ = require('jquery');
var tippy = require('tippy.js');
var SimpleBar = require('SimpleBar');
var DefaultMapView = require('./components/default-map-view');
var EmbedVideo = require('./components/embed-video');
var ScrollMagic = require('scrollmagic');
var Swiper = require('swiper');
var ResponsiveHeaderHelper = require('./components/responsive-header');
var CookiesView = require('./components/cookies-view');

$(function () {
	ResponsiveHeaderHelper($('.js-canvas'));

	new CookiesView({
    el: $('.js-cookies')
  }).render();

	var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    autoplay: {
      delay: 5000
    },
    pagination: {
      el: '.swiper-pagination'
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });

	var defaultMap = new DefaultMapView({
    el: $('#js-map')
  }).render();

  var homeVideo = new EmbedVideo({
    el: $('#embed-video'),
    videoID: '8HM5zKnj_lM'
  }).render()

  if ($('.js-itemsList').length > 0) {
  	new SimpleBar($('.js-itemsList')[0], {
      autoHide: false
    });	
  }

  var controller = new ScrollMagic.Controller();
  var scene = new ScrollMagic.Scene({
	  triggerElement: '#js-members',
	  duration: 200
	})
	.on('end', function (e) {
	  $('#js-members').addClass('is-visible');
	})
	.addTo(controller);

  tippy('.js-tippy');
});
