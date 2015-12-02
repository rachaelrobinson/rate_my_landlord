/*temp stuff*/

var addresses = ["3 Capen Ave, Medford MA", "56 Curtis Ave, Medford MA", "74 Bromfield Somerville MA", "27 Packard Ave, Somerville MA"]
var url_addresses = [];
for (x in addresses) {
	url_addresses.push(encodeURIComponent(addresses[x]));
}

var marker;
var marker;

var map_request;
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

function run_home() {
	map = new google.maps.Map(document.getElementById("map_image"), map_options);
	draw_map(0);
}

function draw_map(x) {
	map_request = new XMLHttpRequest();
	map_request.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?address=' + url_addresses[x] + '&key=AIzaSyDgx4J49sV4eFMRM-b0HxqM7Cq_0c8Nu48', true);
	map_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	map_request.send();
	map_request.onreadystatechange = function() {
		if (map_request.readyState == 4 && map_request.status == 200) {
			response = map_request.responseText;
			parsed = JSON.parse(response);
			lat = parsed["results"][0]["geometry"]["location"]["lat"];
			lng = parsed["results"][0]["geometry"]["location"]["lng"];

			marker = new google.maps.Marker({
				position: new google.maps.LatLng(lat, lng),
				icon: "./poly_design/pin.png",
				title: "<p>" + addresses[x] + "</p>"
			});

			marker.setMap(map);

			google.maps.event.addListener(marker, 'click', (function(marker, x) {
				return function() {
					infowindow.setContent(marker.title);
					infowindow.open(map, marker);
				}
			})(marker, x));
			if (x < 3) {
				draw_map(x+1);
			}
			else {
				add_my_marker();
			}
		}
	}
}

function add_my_marker() {

	//if allowed by the user, get the lat and lng and call make_request()
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			lat = position.coords.latitude;
			lng = position.coords.longitude;
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(lat, lng),
				title: "<p>You</p>"
			});

			google.maps.event.addListener(marker, 'click', function() {
				infowindow.setContent(marker.title);
				infowindow.open(map, marker);
			});

			google.maps.event.addListenerOnce(map, 'idle', function(){
				infowindow.setContent(marker.title);
				infowindow.open(map, marker);
			});
			marker.setMap(map);

			map_center = new google.maps.LatLng(lat, lng);

			map.panTo(map_center);
		});
	}
	//otherwise print an error message on the page
	else {
		elem = document.getElementById("rendered_map");
		elem.innerHTML = "Enable location services to view your location.";
	}

	
}

function user_form() {
	request = new XMLHttpRequest();
	// request.open('POST', , true);
	// request.send();
}



