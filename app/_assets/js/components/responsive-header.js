var $ = require('jquery');

// Responsive header for mochiling :)

module.exports = function ($canvas) {
  if (!$canvas.length) throw new Error('canvas element is needed');

  var onHamburguerClick = function () {
    $canvas.find('.Header-subLinks').addClass('is-headerVisible');
    $canvas.addClass('is-headerVisible');
  };

  var onCanvasClick = function (ev) {
    var $target = $(ev.target);

    if (!$target.closest('.js-responsiveHeader').length) {
      $canvas.find('.Header-subLinks').removeClass('is-headerVisible');
      $canvas.removeClass('is-headerVisible');
    }
  };

  $canvas.click(onCanvasClick);
  $canvas.find('.js-responsiveHeader').click(onHamburguerClick);
};
