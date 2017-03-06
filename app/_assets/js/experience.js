var $ = require('jquery');
var ExperienceInstagramView = require('./experience/experience-instagram-view');

$(function () {
  if (window.instagramTag && $('#instafeed').length) {
    var experienceInstagramView = new ExperienceInstagramView({
      el: $('#instafeed'),
      instagramTag: window.instagramTag
    });
    experienceInstagramView.render();
  }
});
