// API key for http://openlayers.org. Please get your own at
// http://bingmapsportal.com/ and use that instead.
var apiKey = "AqTGBsziZHIJYYxgivLBf0hVdrAk9mWO5cQcb8Yux8sW5M8c8opEC2lZqKR1ZZXf";

// initialize map when page ready
var map;
var gg = new OpenLayers.Projection("EPSG:4326");
var sm = new OpenLayers.Projection("EPSG:900913");
var init = function (onSelectFeatureFunction) {
	map = new OpenLayers.Map({
        div: "map",
        theme: null,
        projection: sm,
        numZoomLevels: 18,
        controls: [
            new OpenLayers.Control.Attribution(),
            new OpenLayers.Control.TouchNavigation({
                dragPanOptions: {
                    enableKinetic: true
                }
            }),
        ],
        layers: [
            new OpenLayers.Layer.OSM("OpenStreetMap", null, {
                transitionEffect: 'resize',
                tileOptions: {
        			"crossOriginKeyword": null
   				}
            })
        ],
        center: new OpenLayers.LonLat(0, 0),
        zoom: 1
    }
    });
}
// Create the Virtual Earth layer
// var veSatLayer = new OpenLayers.Layer.VirtualEarth('Virt. Earth', {
//   sphericalMercator: true,
//   'type': VEMapStyle.Aerial,
// });
// olMap.addLayer(veSatLayer);

// // Create a Google Earth layer (because it is not first, it is not selected by default)
// var googleEarth = new OpenLayers.Layer.Google('Google', {
//   sphericalMercator: true,
// });
// map.addLayer(googleEarth);