var Backbone = require('backbone');
var ExperiencesPopupView = require('./experiences-popup-view');
var countryNames = require('../countries-i18n.json');

var HIGHLIGHT_STYLE = {
  color: '#AAA',
  weight: 1.5,
  opacity: 0.65
};

var HIGHLIGHT_HOVER_STYLE = {
  color: '#F88B52',
  weight: 1.5,
  opacity: 0.65
};

module.exports = function (layer, map, experiencesData, countryName) {
  var countryLower = countryName.toLowerCase();
  var countryTranslated = countryNames[countryLower] && countryNames[countryLower][window.language];
  var content = countryTranslated || countryName;

  var tooltipOptions = {
    direction: 'top',
    permanent: false,
    sticky: true,
    offset: [0, 0]
  };

  var bindTooltip = function () {
    layer.bindTooltip(content, tooltipOptions);
  };

  var unbindTooltip = function () {
    layer.unbindTooltip();
  };

  var bindPopup = function () {
    var view = new ExperiencesPopupView({
      experiencesData: experiencesData
    });
    layer.bindPopup(view.render().el);
  };

  layer.setStyle(HIGHLIGHT_STYLE);

  layer.on('mouseover', function () {
    layer.setStyle(HIGHLIGHT_HOVER_STYLE);
  });

  layer.on('mouseout', function () {
    layer.setStyle(HIGHLIGHT_STYLE);
  });

  layer.on('popupopen', unbindTooltip);
  layer.on('popupclose', bindTooltip);

  bindTooltip();
  bindPopup();
};
