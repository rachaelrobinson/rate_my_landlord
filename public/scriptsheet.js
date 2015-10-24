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

var map_request;
var form_request;
function init() {
	elem = document.getElementsByClassName("page_top");
	[].slice.call(elem).forEach(function (div) {
    	div.innerHTML = "<a href = '/'>Home</a>";
	});
	if (window.location.pathname != "/") {
		run();
	}
}

function send_form() {
	form_request = new XMLHttpRequest();
	form_request.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?address=' + url_school + '&key=AIzaSyDgx4J49sV4eFMRM-b0HxqM7Cq_0c8Nu48', true);
	form_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	form_request.send();
	form_request.onreadystatechange = function() {
		if (form_request.readyState == 4 && form_request.status == 200) {
			response = form_request.responseText;
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

	map_request = new XMLHttpRequest();
	map_request.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?address=' + url_school + '&key=AIzaSyDgx4J49sV4eFMRM-b0HxqM7Cq_0c8Nu48', true);
	map_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	map_request.send();
	map_request.onreadystatechange = function() {
		if (map_request.readyState == 4 && map_request.status == 200) {
			response = map_request.responseText;
			parsed = JSON.parse(response);
			console.log(parsed);
			lat = parsed["results"][0]["geometry"]["location"]["lat"];
			lng = parsed["results"][0]["geometry"]["location"]["lng"];
			draw_map();
		}
	}

};

function draw_map() {
	console.log(lat);
	console.log(lng);
	map_center = new google.maps.LatLng(lat, lng);
	console.log("here");
	map.panTo(map_center);
}
