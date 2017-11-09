var $ = require('jquery');
var SimpleBar = require('SimpleBar');

$(function () {
  if ($('.js-itemsList').length > 0) {
  	new SimpleBar($('.js-itemsList')[0]);	
  }
});
