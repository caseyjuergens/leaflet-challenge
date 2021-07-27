
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
    function style(feature){
        return{
            fillColor: chooseColor(feature.geometry.coordinates[2]),
            fillOpacity: 0.75,
            stroke: true, 
            radius: chooseRadius(feature.properties.mag),
            weight: 1.5
        };
    }

    //choose color based on depth
    function chooseColor(depth){
        if(depth>=90){
            return "#B40000"
        }
        else if (depth<90 && depth>=75){
            return "#F57038"
        }
        else if (depth<75 && depth>=50){
            return "#F59338"
        }
        else if (depth<50 && depth>=25){
            return "#F5C138"
        }
        else if (depth<25 && depth>=10){
            return "#F5DA38"
        }
        else {
            return "#DDF538"
        };
    };

    //choose radius based on magnitude
    function chooseRadius(mag){
        return mag*5;
    };

    L.geoJson(data,{
        //circle markers
        pointToLayer: function(feature, latlng){
            return L.circleMarker(latlng);
        },
        style: style,
    
    }).addTo(myMap);

    //legend
    var legend = L.control({
        position: "bottomright"
    });

    legend.onAdd = function(){

    };

    legend.addTo(myMap)
});


