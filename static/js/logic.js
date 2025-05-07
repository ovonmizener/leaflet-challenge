// 1. Base Map Setup

// Create the 'basemap' tile layer for our map background.
let basemap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
});

// OPTIONAL: Step 2 - Create a second tile layer (called 'street') as an alternative background.
let street = L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
});

// Create the map object with a center and zoom level.
// The default base layer is set to 'basemap'.
let map = L.map("map", {
  center: [37.09, -95.71],
  zoom: 4,
  layers: [basemap]
});

// Create an object to hold our base layers.
let baseMaps = {
  "Basemap": basemap,
  "Street": street
};

// 2. Layer Groups & Controls

// Create separate layer groups for earthquakes and tectonic plates.
let earthquakes = new L.layerGroup();
let tectonicPlates = new L.layerGroup();

// Create an overlays object to hold the overlay layers.
let overlays = {
  "Earthquakes": earthquakes,
  "Tectonic Plates": tectonicPlates
};

// Add a layer control to the map that allows the user to change visible layers.
L.control.layers(baseMaps, overlays).addTo(map);

// 3. Earthquake Data Styling Functions

// Function that returns the style data for each earthquake marker.
function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.geometry.coordinates[2]), // Depth is the third coordinate in the array.
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}

// Function to determine the color of a marker based on earthquake depth.
function getColor(depth) {
  return depth > 90
    ? "#ea2c2c"
    : depth > 70
    ? "#ea822c"
    : depth > 50
    ? "#ee9c00"
    : depth > 30
    ? "#eecc00"
    : depth > 10
    ? "#d4ee00"
    : "#98ee00";
}

// Function to determine the radius of a marker based on earthquake magnitude.
function getRadius(magnitude) {
  return magnitude === 0 ? 1 : magnitude * 4;
}

// 4. Fetch and Plot Earthquake Data

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")
  .then(function (data) {
    // Create a GeoJSON layer with the retrieved earthquake data.
    L.geoJson(data, {
      // For each feature, turn it into a circleMarker.
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng);
      },
      // Apply our style to each circleMarker using styleInfo.
      style: styleInfo,
      // Bind a popup to each marker with its place, magnitude, and depth.
      onEachFeature: function (feature, layer) {
        layer.bindPopup(
          `<h3>${feature.properties.place}</h3>
          <hr>
          <p>Magnitude: ${feature.properties.mag}</p>
          <p>Depth: ${feature.geometry.coordinates[2]} km</p>`
        );
      }
    }).addTo(earthquakes);

    // Add the completed earthquakes layer to the map.
    earthquakes.addTo(map);

    // 5. Create and Add the Legend

    // Create a legend control object positioned in the bottom right.
    let legend = L.control({ position: "bottomright" });

    legend.onAdd = function () {
      // Create a div element with a class "info legend".
      let div = L.DomUtil.create("div", "info legend");
      // Define the depth intervals for the legend.
      let grades = [-10, 10, 30, 50, 70, 90];

      // Loop through the depth intervals and generate a label with a colored square for each interval.
      for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
          "<i style='background: " +
          getColor(grades[i] + 1) +
          "; width: 18px; height: 18px; display: inline-block; margin-right: 8px;'></i> " +
          grades[i] +
          (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
      }
      return div;
    };

    // Add the legend to the map.
    legend.addTo(map);
  });

// 6. OPTIONAL: Fetch and Plot Tectonic Plates Data

d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json")
  .then(function (plate_data) {
    // Create a GeoJSON layer for the tectonic plates data.
    L.geoJson(plate_data, {
      style: {
        color: "orange",
        weight: 2
      }
    }).addTo(tectonicPlates);

    // Add the tectonic plates layer to the map.
    tectonicPlates.addTo(map);
  });
