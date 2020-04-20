let solution = [-1, -1, -1, -1];
let mouseColor = 0;
var isSend = 0;

function createGameClick(){
	if(isSend == 0){
		for(var i = 0; i != 4; i++){
			if(solution[i] == -1){
				return;
			}
		}
		socket.send(solution);
		isSend++;
	}

}

function mouseClick(id){
	document.getElementById(String(id)).style.backgroundColor = getColor(mouseColor);
	solution[id] = mouseColor;
	var filled = 0;
	for(var i = 0; i != 4; i++){
		if(solution[i] != -1){
			filled++;
		}
		if(filled == 4){
			document.getElementById("ghost").style.visibility = "visible";
		}
	}
}

function setMouseColor(colorId){
	mouseColor = colorId;
}

function getMouseColor(){
	return mouseColor;
}

function getColor(colorId){
	if(colorId == 0){
		return "red";
	}
	if(colorId == 1){
		return "blue";
	}
	if(colorId == 2){
		return "white";
	}
	if(colorId == 3){
		return "black";
	}
	if(colorId == 4){
		return "purple";
	}
	if(colorId == 5){
		return "brown";
	}
	if(colorId == 6){
		return "green";
	}
	if(colorId == 7){
		return "yellow";
	}
}

var socket = new WebSocket("ws://localhost:3000");
socket.onmessage = function(event){
	console.log(event);
	if(event.data[0] === '-'){
		if(event.data[1] == 1){
		document.getElementById("gameId").innerHTML = "Your game is being played!";
		}
		if(event.data[1] == 2){
			document.getElementById("gameId").innerHTML = "The code is cracked, so you lost!";
		}
		if(event.data[1] == 3){
			document.getElementById("gameId").innerHTML = "The code is not cracked, so you won!";
		}
	}else{
	document.getElementById("ghost").style.visibility = "hidden";
	document.getElementById("ghost2").style.visibility = "hidden";
	document.getElementById("gameId").innerHTML = "Your game is created! The id is: " + event.data;
	}
}
socket.onopen = function(){	
	document.getElementById("ghost").style.visibility = "hidden";
//	document.getElementById("hello").innerHTML = "Sending a first message to the server ..."; // this is to send the msg to element id = hello.
};
