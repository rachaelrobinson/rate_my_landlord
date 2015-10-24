/*script haha wahoo*/

//center of the map to be created
var map_center;

//options to be set when the map is created
var map_options =  {
				zoom: 15,
				center: map_center,
				mapTypeId: google.maps.MapTypeId.ROADMAP
};

//window containing info for when a marker is clicked
var infowindow = new google.maps.InfoWindow();

//the map itself
var map;

var lat = 0;
var lng = 0;
var school = "Boulder";
var url_school = encodeURIComponent(school);

var marker;

var request;
function init() {
	elem = document.getElementsByClassName("page_top");
	[].slice.call(elem).forEach(function (div) {
    	div.innerHTML = "<a href = '/'>Home</a>";
	});
	if (window.location.pathname != "/") {
		run();
	}
	request = new XMLHttpRequest();
	request.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?address=' + url_school + '&key=AIzaSyDgx4J49sV4eFMRM-b0HxqM7Cq_0c8Nu48', true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send();
	request.onreadystatechange = function() {
		console.log(request.readyState);
		if (request.readyState == 4 && request.status == 200) {
			response = request.responseText;
			parsed = JSON.parse(response);
			console.log(parsed);
			lat = parsed["results"][0]["geometry"]["location"]["lat"];
			lng = parsed["results"][0]["geometry"]["location"]["lng"];
			draw_map();
		}
	}
}


function run() {
	map = new google.maps.Map(document.getElementById("gmap"), map_options);

};

function draw_map() {
	console.log(lat);
	console.log(lng);
	map_center = new google.maps.LatLng(lat, lng);
	console.log("here");
	map.panTo(map_center);
}
