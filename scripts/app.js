// define globals
var weekly_quakes_endpoint = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
let timeElapsed = 0;
let map;
let icons;

$(document).ready(function() {
  console.log("Let's get coding!");
  // CODE IN HERE!
  initMap();
  doAjax();
});

function onSuccess(json) {
  console.log(json);

  json.features.forEach(function(v, i) {
    timeElapsed = Math.round((Date.now() - v.properties.time) / 3600000);
    $("#info").append(
      `<p>${v.properties.title} / ${timeElapsed} hours ago.</p>`
    );

    // CREATE MARKER
    var lat = v.geometry.coordinates[1];
    var lng = v.geometry.coordinates[0];
    new google.maps.Marker({
      position: new google.maps.LatLng(lat,lng),
      map: map,
      icon: icons.earthquake.icon
    });

  });
}




function onError(xhr, status, errorThrown) {
  alert("Sorry, there was a problem!");
  console.log("Error: " + errorThrown);
  console.log("Status: " + status);
  console.dir(xhr);
}

function doAjax() {
  console.log($("#q").val());
  $.ajax({

    // What kind of request
    method: "GET",

    // The URL for the request
    url: weekly_quakes_endpoint,

    // The data to send aka query parameters
    //  data: $("#searchForm").serialize(),

    // Code to run if the request succeeds;
    // the response is passed to the function
    success: onSuccess,

    // Code to run if the request fails; the raw request and
    // status codes are passed to the function
    error: onError

  })
};


function initMap() {
  var uluru = {
    lat: 37.78,
    lng: -122.44
  };
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
  var iconBase = 'images/';
  icons = {
    earthquake: {
      icon : {url: iconBase + 'earthquake.png',
      scaledSize: new google.maps.Size(20,20)
    }
    },
  };
}
