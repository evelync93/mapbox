const ACCESS_TOKEN =
  "pk.eyJ1IjoiZXZjaGVuIiwiYSI6ImNrYmppMG9pZzBsc2UycnBkZ2Vzanl3aWkifQ.fNIsmkaJ55MEPkEz-rGShg";
const MAPBOX_STYLE = "mapbox://styles/evchen/ckbjkg8x10m8i1itfugliru9p/draft";

mapboxgl.accessToken = ACCESS_TOKEN;

var map = new mapboxgl.Map({
  container: "map",
  style: MAPBOX_STYLE,
  center: [-74.005974, 40.73061],
  zoom: 13,
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

//popup on hover
map.on("load", function () {
  map.addSource("places", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            description:
              "<strong>Raku</strong><p>48 MacDougal St, New York, NY 10012</p><p>Japanese handmade udon</p>",
            icon: "restaurant-noodle",
          },
          geometry: {
            type: "Point",
            coordinates: [-74.00252, 40.72724],
          },
        },
        {
          type: "Feature",
          properties: {
            description:
              "<strong>Prince Street Pizza</strong><p>27 Prince St New York, NY 10012</p><p>Best Sicilian Pepperoni Slices</p>",
            icon: "restaurant-pizza",
          },
          geometry: {
            type: "Point",
            coordinates: [-74.00252, 40.73724],
          },
        },
        {
          type: "Feature",
          properties: {
            description:
              "<strong>to updated</strong><p>27 Prince St New York, NY 10012</p><p>Best Sicilian Pepperoni Slices</p>",
            icon: "bar",
          },
          geometry: {
            type: "Point",
            coordinates: [-74.00252, 40.73724],
          },
        },
        {
          type: "Feature",
          properties: {
            description:
              "<strong>to updated</strong><p>27 Prince St New York, NY 10012</p><p>Best Sicilian Pepperoni Slices</p>",
            icon: "restaurant",
          },
          geometry: {
            type: "Point",
            coordinates: [-74.00252, 40.73724],
          },
        },
      ],
    },
  });

  // Add a layer showing the places.
  map.addLayer({
    id: "places",
    type: "symbol",
    source: "places",
    layout: {
      "icon-image": "{icon}-15",
      "icon-allow-overlap": true,
    },
  });

  // Create a popup, but don't add it to the map yet.
  var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

  map.on("mouseenter", "places", function (e) {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = "pointer";

    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.description;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates).setHTML(description).addTo(map);
  });

  map.on("mouseleave", "places", function () {
    map.getCanvas().style.cursor = "";
    popup.remove();
  });
});
