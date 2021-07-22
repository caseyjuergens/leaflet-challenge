
//go to USGS geojson feed and pick data set
//create a map that plots all of the earthquakes based on lat/long
//earthquakes with higher magnitudes should appear larger and earthquakes with greater depth darker. 
//depth of earth can be found as the thir coord of each earthquake
//include popups that provide additional infor when a marker is clicked
//create a legend
// Creating map object
var myMap = L.map("map", {
    center: [40.7, -122.95],
    zoom: 4
});

// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);

//url for USGS sute for all earthquakes over 2.5 in the past month
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson";

d3.json(url).then(function(data){
    var features= data.features;

    //loop thru data
    for (var i=0; i < features.length; i++){

    }
});


//createFeature fuunction
function createFeatures(earthquakes){
    //bind pop up with info
    function onEachFeature(feature, layer){
        layer.bindPopup("<h4>" + feature.properties.place + "</h4><hr><p>" +
            new Date(feature.properties.time)+ "</p>");
    }
    //create layer with feature array
    var earthquakeData = L.geoJson(earthquakes, {
        onEachFeature: onEachFeature 
    });
    //sending layer info to createMap func
    createMap(earthquakeData);
}


    

