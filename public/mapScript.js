/*temp stuff*/

var school = "Harvard University";
var address = "54 Sunset Rd Medford, MA 02144"
var url_school = encodeURIComponent(school);
var url_address = encodeURIComponent(address);


var marker;
var house_marker;

var map_request;
var school_form;
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


function init() {
	// if (window.location.pathname != "/") {
	// 	run_other();
	// }
	//else {
		run_home();
	//}
}


function run_home() {
	map = new google.maps.Map(document.getElementById("map_image"), map_options);

	//if allowed by the user, get the lat and lng and call make_request()
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			lat = position.coords.latitude;
			lng = position.coords.longitude;
			draw_map();
		});
	}
	//otherwise print an error message on the page
	else {
		elem = document.getElementById("rendered_map");
		elem.innerHTML = "Enable location services to view your location.";
	}
}

function school_form() {
	school_form = new XMLHttpRequest();
	school_form.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?address=' + url_school + '&key=AIzaSyDgx4J49sV4eFMRM-b0HxqM7Cq_0c8Nu48', true);
	school_form.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	school_form.send();
	school_form.onreadystatechange = function() {
		if (school_form.readyState == 4 & school_form.status == 200) {
			response = school_form.responseText;
			parsed = JSON.parse(response);
			console.log(parsed);
			lat = parsed["results"][0]["geometry"]["location"]["lat"];
			lng = parsed["results"][0]["geometry"]["location"]["lng"];
			draw_map();
		}
	}
}

function run_home() {
	map = new google.maps.Map(document.getElementById("map_image"), map_options);

	//if allowed by the user, get the lat and lng and call make_request()
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			lat = position.coords.latitude;
			lng = position.coords.longitude;
			draw_map();
			run_other();
			});
		}

	//otherwise print an error message on the page
	else {
		elem = document.getElementById("rendered_map");
		elem.innerHTML = "Enable location services to view your location.";
	}
}

function run_other() {
	//map = new google.maps.Map(document.getElementById("gmap"), map_options);

	map_request = new XMLHttpRequest();
	map_request.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?address=' + url_address + '&key=AIzaSyDgx4J49sV4eFMRM-b0HxqM7Cq_0c8Nu48', true);
	map_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	map_request.send();
	map_request.onreadystatechange = function() {
		if (map_request.readyState == 4 && map_request.status == 200) {
			response = map_request.responseText;
			parsed = JSON.parse(response);
			lat = parsed["results"][0]["geometry"]["location"]["lat"];
			lng = parsed["results"][0]["geometry"]["location"]["lng"];
			draw_house();
		}
	}

};

function draw_map() {
	house_marker = new google.maps.Marker({
		position: new google.maps.LatLng(lat, lng),
		title: "<p>You</p>"
	});

	google.maps.event.addListener(house_marker, 'click', function() {
		infowindow.setContent(house_marker.title);
		infowindow.open(map, house_marker);
	});

	google.maps.event.addListenerOnce(map, 'idle', function(){
		infowindow.setContent(house_marker.title);
		infowindow.open(map, house_marker);
	});

	house_marker.setMap(map);

	map_center = new google.maps.LatLng(lat, lng);

	map.panTo(map_center);
}

function draw_house() {
	
	marker = new google.maps.Marker({
		position: new google.maps.LatLng(lat, lng),
		icon: "./poly_design/pin.png",
		title: "<p>A house</p>"
	});

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(marker.title);
		infowindow.open(map, marker);
	});

	marker.setMap(map);
}

function user_form() {
	request = new XMLHttpRequest();
	// request.open('POST', , true);
	// request.send();
}



