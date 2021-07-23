
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
    function markers(features){
        return{
            fillColor: chooseColor(feature.geometry.coordinates[2]),
            fillOpacity: 0.75,
            radius: chooseRadius(feature.properties.mag),
            weight: 1.5
        };
    }
    
    //choose color based on depth
    function chooseColor(depth){
        if(depth>=90){
            return "#FF6400"
        }
        else if (depth<90 && depth>=75){
            return "#FF6F12"
        }
        else if (depth<74 && depth>=50){
            return "#FF7B25"
        }
        else if (depth<49 && depth>=25){
            return "#FF8536"
        }
        else if (depth<24 && depth>=10){
            return "#FF8F46"
        }
        else {
            return "#FE9B5B"
        };
    };

    //choose radius based on magnitude
    function chooseRadius(mag){
        return mag*5;
    };

    
});


