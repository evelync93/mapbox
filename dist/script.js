var MapboxGeocoder = require("@mapbox/mapbox-gl-geocoder");

const ACCESS_TOKEN =
  "pk.eyJ1IjoiZXZjaGVuIiwiYSI6ImNrYmppMG9pZzBsc2UycnBkZ2Vzanl3aWkifQ.fNIsmkaJ55MEPkEz-rGShg";
const MAPBOX_STYLE = "mapbox://styles/evchen/ckbjkg8x10m8i1itfugliru9p/draft";

mapboxgl.accessToken = ACCESS_TOKEN;

var map = new mapboxgl.Map({
  container: "map",

  style: MAPBOX_STYLE,
  center: [-77.04, 38.907],
  zoom: 14,
});
