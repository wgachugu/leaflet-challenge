// Creating a function to determine the circle size based on the magnitude
function circleSize(magnitude) {
  return (magnitude * 20000);
}

// Creating a function to determine the circle color based on the depth of the earthquake
function circleColor(magnitude) {
  if (magnitude > 5) {
      return "#f54e42"
  }
  else if (magnitude > 4) {
      return "#f58a42"
  }
  else if (magnitude > 3) {
      return "#f5cb42"
  }
  else if (magnitude > 2) {
      return "#e3f542"
  }
  else if (magnitude > 1) {
      return "#87f542"
  }
  else {
      return "#42f569"
  }
}

// Creating the map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Load the GeoJSON data.
var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Get the data with d3
d3.json(geoData).then(function(data) {

  // Loop through data, and create the circles
  for (var i = 0; i < data.features.length; i++) {
    
    // Setting the circle radius & color by passing magnitude into the circleSize & circleColor functions    
    L.circle([data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]], {
      color: "black",
      fillColor: circleColor(data.features[i].geometry.coordinates[2]),
      fillOpacity: 0.5,
      radius: circleSize(data.features[i].properties.mag)
    
    // adding popup feature 
    }).bindPopup(`<h3>${data.features[i].properties.title}</h3><hr><p>Depth: ${data.features[i].geometry.coordinates[2]} km</p>`)
    .addTo(myMap)     
}})
   
// Set up the legend
var legend = L.control({ position: "bottomright" });

legend.onAdd = function () {
  var div = L.DomUtil.create("div", "info legend");

  var grades = ['-10-10', '10-30', '30-50', '50-70', '70-90', '90+'];
  
  var colors = [
    "#42f569",
    "#87f542",
    "#e3f542",
    "#f5cb42",
    "#f58a42",
    "#f54e42"
  ];

  var labels = [];

  // Looping through color intervals to create a legend with a colored square for each
  grades.forEach(function(grade, index){
    labels.push("<div class = 'row'><li style=\"background-color: " + colors[index] +  "; width: 20px"+ "; height: 15px" + "\"></li>" + "<li>" + grade + "</li></div>");
  })

  div.innerHTML += "<ul>" + labels.join("") +"</ul>";
  
  return div;
};

legend.addTo(myMap);  




