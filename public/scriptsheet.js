/*script haha wahoo*/

//center of the map to be created
var map_center = new google.maps.LatLng(42.4069, -71.1198);

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

function init() {
	elem = document.getElementsByClassName("page_top");
	[].slice.call(elem).forEach(function (div) {
    	div.innerHTML = "<a href = '/'>Home</a>";
	});
	
}


function run() {
	map = new google.maps.Map(document.getElementById("gmap"), map_options);

};