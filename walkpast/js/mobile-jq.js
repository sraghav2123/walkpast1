// Start with the map page
//window.location.replace(window.location.href.split("#")[0] + "#mappage");



$("#plus").live('click', function(){
    map.zoomIn();
});

$("#minus").live('click', function(){
    map.zoomOut();
});

// $(document).delegate("#mappage", "pageshow", function() {
//     $("map").not(":visible").show();
// });