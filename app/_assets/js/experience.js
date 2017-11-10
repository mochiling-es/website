var $ = require('jquery');
global.jQuery = $;
var tippy = require('tippy.js');
var ExperienceInstagramView = require('./experience/experience-instagram-view');
var ResponsiveHeaderHelper = require('./components/responsive-header');
var CookiesView = require('./components/cookies-view');

$(function () {
  ResponsiveHeaderHelper($('.js-canvas'));
  new CookiesView({
    el: $('.js-cookies')
  }).render();

  if (window.instagramTag && $('#instafeed').length) {
    var experienceInstagramView = new ExperienceInstagramView({
      el: $('#instafeed'),
      instagramTag: window.instagramTag
    });
    experienceInstagramView.render();
  }

  if (window.videoURL) {
    var $iframe = $('<iframe>')
      .attr('src', videoURL + '?autoplay=1')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('frameborder', '0')
      .attr('allowfullscreen', '')
      .addClass('Experience-video');

    $('.js-playVideo').click(function () {
      $('.Experience-wrapper').append($iframe);
    });
  }

  tippy('.js-tippy');
});
