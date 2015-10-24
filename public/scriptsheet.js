/*script haha wahoo*/
window.onload = function() {
 setTimeout (function () {
  scrollTo(0,0);
 }, 100); //100ms for example
}
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
var school = "Harvard University";
var url_school = encodeURIComponent(school);

var marker;

var map_request;
var form_request;
function init() {
	if (window.location.pathname != "/") {
		run_other();
	}
	else if(window.location.pathname == "/") {
		run_home();
	}
}

function displaySignUp() {
	elems = document.getElementsByClassName("homesweethome");
	[].slice.call(elems).forEach(function (elem) {
		$(elem).fadeOut("slow");
	});
	elems = document.getElementsByClassName("howitworks");
	[].slice.call(elems).forEach(function (elem) {
		$(elem).fadeOut("slow");
	});
	elems = document.getElementsByClassName("signupform");
	[].slice.call(elems).forEach(function (elem) {
		$(elem).fadeOut("slow");
	});
	elems = document.getElementsByClassName("loginform");
	[].slice.call(elems).forEach(function (elem) {
		$(elem).fadeIn("slow");
		elem.innerHTML = '<section class = "login-page"><h1>Welcome</h1><form><table><tr>' + 
		'<td><label>Email:</label></td><td><input name="user[email]" type="text" value=""></td></tr><tr>' +
	    '<td><label>Password:</label></td><td><input name="user[password]" type="password" value=""></td>' + 
	    '</tr></table><input type="submit" value="Login" class="submit"/></form></section>';
	});
	


}

function displayLogin() {
	elems = document.getElementsByClassName("homesweethome");
	[].slice.call(elems).forEach(function (elem) {
		$(elem).fadeOut("slow");
	});
	elems = document.getElementsByClassName("howitworks");
	[].slice.call(elems).forEach(function (elem) {
		$(elem).fadeOut("slow");
	});
	elems = document.getElementsByClassName("loginform");
	[].slice.call(elems).forEach(function (elem) {
		$(elem).fadeOut("slow");
	});
	elems = document.getElementsByClassName("loginbg");
	[].slice.call(elems).forEach(function (elem) {
		$(elem).fadeIn("slow");
		elem.innerHTML = '<img src="./poly_design/login_page/loginbackground.png"/><div class=loginform><section class = "login-page"><form><table><tr>' + 
		'<td></td><td><input name="user[email]" type="text" value=""></td></tr><tr>' +
	    '<td></td><td><input name="user[password]" type="password" value=""></td>' + 
	    '</tr></table><input type="submit" value="" class="submit"/></form></section></div>';
	});
	// elems = document.getElementsByClassName("signupform");
	// [].slice.call(elems).forEach(function (elem) {
	// 	$(elem).fadeIn("slow");
	// 	elem.innerHTML = '<section class = "login-page"><h1>Welcome</h1><form><table><tr>' + 
	// 	'<td><label>Email:</label></td><td><input name="user[email]" type="text" value=""></td></tr><tr>' +
	//     '<td><label>Password:</label></td><td><input name="user[password]" type="password" value=""></td>' + 
	//     '</tr></table><input type="submit" value="" class="submit"/></form></section>';
	// });
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

var scrollY = 0;
var distance = 1;
var dist = 8;
var speed = 30;

function scrollToInfo() {
	autoScrollTo("restofpage");
	console.log("IN FUNCTION");
}
function autoScrollTo(el) {
	  var currentY = window.pageYOffset;
	  var targetY = document.getElementById(el).offsetTop;
	  var bodyHeight = document.body.offsetHeight;
	  var yPos = currentY + window.innerHeight;
	  var animator = setTimeout('autoScrollTo(\'' + el + '\')', 24);
	  if (yPos > bodyHeight) {
	    clearTimeout(animator);
	  } else {
	    if (currentY < targetY - distance) {
	      scrollY = currentY + dist;
	      window.scroll(0, scrollY);
	    } else {
	      clearTimeout(animator);
	    }
	  }
	}
function resetScroller(el) {
	  var currentY = window.pageYOffset;
	  var targetY = document.getElementById(el).offsetTop;
	  var animator = setTimeout('resetScroller(\'' + el + '\')', speed);
	  if (currentY > targetY) {
	    scrollY = currentY - distance;
	    window.scroll(0, scrollY);
	  } else {
	    clearTimeout(animator);
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


function run_other() {
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
			draw_house();
		}
	}

};

function draw_map() {
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
}

function draw_house() {
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
}


