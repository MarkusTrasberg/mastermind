var active = 0;
var activeReal = 0;
var messagegot = 0;
var socket = new WebSocket("ws://localhost:3000");
socket.onopen = function(){	
	checkCookie();
	setCookie();



var elem = document.documentElement;



	socket.send("GIMME Splash!");
	socket.send("GIMME Splash2!");
};
socket.onmessage = function(event){
	console.log(event.data);
	if(messagegot == 0){
		active = event.data[0];
		document.getElementById("played").innerHTML = active;
		messagegot++;
	}else{
		activeReal = event.data[0];
		document.getElementById("activeGames").innerHTML = activeReal;
	}
}

var elem = document.documentElement;
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

function setCookie() {
	if(document.cookie == ""){
		document.cookie = parseInt(0);
	}else{
	if(isNaN(parseInt(document.cookie))){
		document.cookie = parseInt(0);
	}
  document.cookie = parseInt(document.cookie) + 1;
}
}

function getCookie() {
	if(isNaN(document.cookie)){
		return 0;
	}
  return document.cookie;
}

function checkCookie() {
	if(isNaN(parseInt(document.cookie))){
		document.getElementById("visited").innerHTML = "0";
	}else{
  		document.getElementById("visited").innerHTML = parseInt(parseInt(document.cookie) + 1);

	}
}