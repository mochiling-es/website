var $ = require('jquery');
global.jQuery = $;
var ExperienceInstagramView = require('./experience/experience-instagram-view');
var ResponsiveHeaderHelper = require('./components/responsive-header');

$(function () {
  ResponsiveHeaderHelper($('.js-canvas'));

  if (window.instagramTag && $('#instafeed').length) {
    var experienceInstagramView = new ExperienceInstagramView({
      el: $('#instafeed'),
      instagramTag: window.instagramTag
    });
    experienceInstagramView.render();
  }
});
