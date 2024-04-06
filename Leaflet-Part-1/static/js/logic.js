
let geoUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
let colors = ["#009933", "#66ff66", "#ccffcc", "#ffccff", "#ff66ff", "#cc00cc"];

//Create markers for each earthquake instance
function createFeatures(earthquakeData) {
    let quakeMarkers = [];
    for (i in earthquakeData) {
      let quake = earthquakeData[i];
      let coords = quake["geometry"]["coordinates"];
      let props = quake["properties"];
      let latlng = [coords[1], coords[0]];
      let depth = parseFloat(coords[2]);

      // Save the earthquake data in a variable.
      quakeMarkers.push(
        L.circle(latlng, {
          stroke: false,
          fillOpacity: 0.6,
          color: "black",
          fillColor: getColor(depth),
          radius: props["mag"]*10000
        }).bindPopup(`Magnitude: ${props["mag"]}<br>Location: ${props["place"]}`)
      );
    }
  
    // Pass the earthquake data to a createMap() function.
    createMap(quakeMarkers);
};
  
 //Generate map from earthquake data retrieved
function createMap(earthquakes) {
    // Create the base layers.
    let street = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })

    var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    });

    // Create a baseMaps object.
    let baseMaps = {
      "State Map": CartoDB_Positron
    };
  
    // Create an overlays object.
    let quakeLayer = L.layerGroup(earthquakes);
  
    let overlayMaps = {
      "QuakeSpots": quakeLayer
    }
  
    // Create the map with both layers
    let myMap = L.map("map", {
      center: [
        38.59, -102.71
      ],
      zoom: 5,
      layers: [CartoDB_Positron, quakeLayer]
    });
  
    //Add layers to map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: true
    }).addTo(myMap);

    addLegend(myMap);
};

function getColor(depth) {
    switch (true) {
        case (depth < -10):
            return colors[0];
        case (depth < 0):
            return colors[1];
        case (depth < 10):
            return colors[2];
         case (depth < 20):
            return colors[3];
        case (depth < 30):
            return colors[4];
        default:
            return colors[5];
    }
};

function addLegend(map) {
    let legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {
        let div = L.DomUtil.create('div', 'info legend'),
            labels = ["< -10", "-10-0", "0-10", "10-20", "20-30", "> 30"],
            title= ['<strong>Depth</strong><br>'];

        div.innerHTML = title;
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < colors.length; i++) {
            div.innerHTML +=
                '<i class="square" style="background:' + colors[i] + '"></i> ' +
                labels[i]  + '<br>';
        }

        return div;
    };

    legend.addTo(map);
};


//On page load, retrieve json data and begin process
d3.json(geoUrl).then((data) => {
    createFeatures(data.features);
})