// API key for http://openlayers.org. Please get your own at
// http://bingmapsportal.com/ and use that instead.
var apiKey = "AqTGBsziZHIJYYxgivLBf0hVdrAk9mWO5cQcb8Yux8sW5M8c8opEC2lZqKR1ZZXf";

// initialize map when page ready
var map;
var gg = new OpenLayers.Projection("EPSG:4326");
var sm = new OpenLayers.Projection("EPSG:900913");

var init = function (onSelectFeatureFunction) {

  
    // create map
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
            })
        ],
        layers: [          
            new OpenLayers.Layer.OSM("OpenStreetMap", null, {
                transitionEffect: 'resize'
            }),
            // new OpenLayers.Layer.Bing({
            //     key: apiKey,
            //     type: "Road",
            //     // custom metadata parameter to request the new map style - only useful
            //     // before May 1st, 2011
            //     metadataParams: {
            //         mapVersion: "v1"
            //     },
            //     name: "Bing Road",
            //     transitionEffect: 'resize'
            // }),
            // new OpenLayers.Layer.Bing({
            //     key: apiKey,
            //     type: "Aerial",
            //     name: "Bing Aerial",
            //     transitionEffect: 'resize'
            // }),
            // new OpenLayers.Layer.Bing({
            //     key: apiKey,
            //     type: "AerialWithLabels",
            //     name: "Bing Aerial + Labels",
            //     transitionEffect: 'resize'
            // }),
            //vector
        ],
        center: new OpenLayers.LonLat(0, 0),
        zoom: 1
    });


};
