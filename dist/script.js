const ACCESS_TOKEN =
  "pk.eyJ1IjoiZXZjaGVuIiwiYSI6ImNrYmppMG9pZzBsc2UycnBkZ2Vzanl3aWkifQ.fNIsmkaJ55MEPkEz-rGShg";
const MAPBOX_STYLE = "mapbox://styles/evchen/ckbjkg8x10m8i1itfugliru9p/draft";

mapboxgl.accessToken = ACCESS_TOKEN;

var map = new mapboxgl.Map({
  container: "map",
  style: MAPBOX_STYLE,
  center: [-74.005974, 40.712776],
  zoom: 8,
});

//search function
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
  })
);

//custom marker - new york
var marker = new mapboxgl.Marker()
  .setLngLat([-74.005974, 40.712776])
  .addTo(map);

//custom marker - los angeles
var marker = new mapboxgl.Marker()
  .setLngLat([-118.243683, 34.052235])
  .addTo(map);

//directions
map.addControl(
  new MapboxDirections({
    accessToken: mapboxgl.accessToken,
  }),
  "top-left"
);
