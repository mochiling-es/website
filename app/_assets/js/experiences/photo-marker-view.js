var _ = require('underscore');
var L = require('leaflet');
var template = _.template(
  '<div class="Popup Popup--horizontal Popup--small">' +
    '<div class="Popup-image">' +
      '<a target="_blank" href="<%- imageLink %>">' +
        '<i class="fa fa-circle-o-notch fa-2x fa-spin Color--emphasis Popup-imageLoader"></i>' +
        '<img src="<%- imageUrl %>" alt="<%- title %>" title="<%- title %>" />' +
      '</a>' +
    '</div>' +
    '<div class="Popup-info Text Text--med Color--secondary">' +
      '<%- location %>' +
    '</div>' +
  '</div>'
);

var CIRCLE_STYLE = {
  radius: 5,
  color: '#F88B52',
  fillColor: '#FFF',
  weight: 2,
  opacity: 0.7,
  fillOpacity: 1
};

var CIRCLE_HOVER_STYLE = {
  radius: 7,
  color: '#F88B52',
  fillColor: '#FFF',
  weight: 2,
  opacity: 1,
  fillOpacity: 1
};

module.exports = function (marker) {
  var latlng = [marker.location.latitude, marker.location.longitude];
  var location = marker.location.name;
  var imageUrl = marker.images.thumbnail.url;
  var imageLink = marker.link;
  var circleMarker = new L.circleMarker(latlng, CIRCLE_STYLE);

  circleMarker.on('mouseover', function () {
    this.setStyle(CIRCLE_HOVER_STYLE);
  });

  circleMarker.on('mouseout', function () {
    this.setStyle(CIRCLE_STYLE);
  });
  
  circleMarker.bindPopup(
    template({
      imageLink: imageLink,
      imageUrl: imageUrl,
      title: marker.caption.text,
      location: location
    })
  );
  return circleMarker;
}
