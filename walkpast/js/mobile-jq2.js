// Start with the map page
window.location.replace(window.location.href.split("#")[0] + "#mappage");

var selectedFeature = null;

// fix height of content
function fixContentHeight() {
    var footer = $("div[data-role='footer']:visible"),
        content = $("div[data-role='content']:visible:visible"),
        viewHeight = $(window).height(),
        contentHeight = viewHeight - footer.outerHeight();

    if ((content.outerHeight() + footer.outerHeight()) !== viewHeight) {
        contentHeight -= (content.outerHeight() - content.height() + 1);
        content.height(contentHeight);
    }

    if (window.map && window.map instanceof OpenLayers.Map) {
        map.updateSize();
    } else {
        // initialize map
        init(function(feature) { 
            selectedFeature = feature; 
            $.mobile.changePage("#popup", "pop"); 
        });
        initLayerList();
    }
}

// one-time initialisation of button handlers 

$("#plus").live('click', function(){
    map.zoomIn();
});

$("#minus").live('click', function(){
    map.zoomOut();
});


//fix the content height AFTER jQuery Mobile has rendered the map page
$('#mappage').live('pageshow',function (){
    fixContentHeight();
});

$(window).bind("orientationchange resize pageshow", fixContentHeight);    


$('#searchpage').live('pageshow',function(event, ui){
    $('#query').bind('change', function(e){
        $('#search_results').empty();
        if ($('#query')[0].value === '') {
            return;
        }
        //$.mobile.showPageLoadingMsg();

        // Prevent form send
        e.preventDefault();

        var searchUrl = 'http://open.mapquestapi.com/nominatim/v1/search.php?format=json&=westminster+abbey&q=';
        searchUrl += $('#query')[0].value;

        $.getJSON(searchUrl, function(data) {
            $.each(data, function() {
                var place = this;
                $('<li>')
                    .hide()
                    .append($('<h2 />', {
                        text: place.display_name
                    }))
                    .append($('<p />', {
                        html: '<b>' + place.countryName + '</b> ' + place.fcodeName
                    }))
                    .appendTo('#search_results')
                    .click(function() {
                        $.mobile.changePage('#mappage');
                        var lonlat = new OpenLayers.LonLat(place.lon, place.lat);
                        map.setCenter(lonlat.transform(gg, sm), 15);
                    })
                    .show();
            });
            $('#search_results').listview('refresh');
            $.mobile.hidePageLoadingMsg();
        });
    });
    // only listen to the first event triggered
    $('#searchpage').die('pageshow', arguments.callee);
});


function initLayerList() {
    var baseLayers = map.getLayersBy("isBaseLayer", true);
    $.each(baseLayers, function() {
        addLayerToList(this);
    });
    var overlayLayers = map.getLayersBy("isBaseLayer", false);
    $.each(overlayLayers, function() {
        addLayerToList(this);
    });
      
    map.events.register("addlayer", this, function(e) {
        addLayerToList(e.layer);
    });
    // var gg = new OpenLayers.Projection("EPSG:4326");
    // var sm = new OpenLayers.Projection("EPSG:900913");
    // var position = new OpenLayers.LonLat(77.3833,29.0167).transform(gg,sm);
    // var zoom = 10;
    // map.setCenter(position, zoom );
}

function addLayerToList(layer) {
    if (layer.isBaseLayer) {
        layer.map.setBaseLayer(layer);
    } else {
        layer.setVisibility(!layer.getVisibility());
    }
}
