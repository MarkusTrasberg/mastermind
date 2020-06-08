var active = 0;
var activeReal = 0;
var messagegot = 0;
var socket = new WebSocket("ws://localhost:3000");
socket.onopen = function(){	
	socket.send("GIMME Splash!")
	socket.send("GIMME Splash2!")
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