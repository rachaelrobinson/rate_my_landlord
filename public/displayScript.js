/*script haha wahoo*/

window.onload = function() {
	setTimeout (function () {
		scrollTo(0,0);
	}, 100); //100ms for example
}

var scrollY = 0;
var distance = 1;
var dist = 30;
var speed = 30;

function autoScrollTo(el) {
	var currentY = window.pageYOffset;
	var targetY = document.getElementById(el).offsetTop;
	var bodyHeight = document.body.offsetHeight;
	var yPos = currentY + window.innerHeight;
	var animator = setTimeout('autoScrollTo(\'' + el + '\')', 24);
	if (yPos > bodyHeight) {
		clearTimeout(animator);
	} 
	else {
	    if (currentY < targetY - distance) {
	    	scrollY = currentY + dist;
	    	window.scroll(0, scrollY);
	    } 
	    else {
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
	}
	else {
		clearTimeout(animator);
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
	elems = document.getElementsByClassName("loginbg");
	[].slice.call(elems).forEach(function (elem) {
		$(elem).fadeIn("slow");
		elem.innerHTML = '<img src="./poly_design/login_page/loginbackground.png"/><div class=loginform><section class = "login-page"><form action="user_form()"><table><tr>' + 
		'<td></td><td><input name="user[email]" type="text" value=""></td></tr><tr>' +
	    '<td></td><td><input name="user[password]" type="password" value=""></td>' + 
	    '</tr></table><input type="submit" value="" class="submit"/></form></section></div>';
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

