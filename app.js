function IsPlaying(id, player){
	this.id = id;
	this.player = player;

	this.getGameId = function (){
		return this.id;
	}
	this.getPlayer = function(){
		return this.player;
	}
}

function Game(id, solution, creator){
	this.id = id;
	this.solution = solution;
	this.creator = creator;
	this.getId = function (){
		return this.id;
	}
	this.getSolution = function (){
		return this.solution;
	}
	this.getCreator = function (){
		return this.creator;
	}
}
var games = [];
var players = [];
var active = 0;
var activeReal = 0;
var activePlayers = 0;

var express = require("express");
var http = require("http");
var indexRouter = require("./routes/index");
var websocket = require("ws");

var port = process.argv[2];
var app = express();

app.use(express.static(__dirname + "/public"));

var server = http.createServer(app).listen(process.env.PORT || 3000);
const wss = new websocket.Server({ server });

wss.on("connection", function(ws) { 

ws.on("message", function incoming(message) {

	if(message === "GIMME Splash2!"){;
		ws.send(activeReal);
	}else{

	if(message === "GIMME Splash!"){
		ws.send(active);
	}else{

	if(isNaN(message) ) {
		console.log(message[0]);
	console.log(message[3]);
	if(message[0] === '-'){
		activeReal--;
		for(var q = 0; q != active; q++){
      		if(message[3] == games[q].getId()){
      			games[q].getCreator().send(message);
      			console.log("id is found:" + message);
      		}
      	}
		}else{	
			var tempgame = new Game(active, message, ws);
	    	games[active] = tempgame;
	    	ws.send(active);
    		active++;
    		activeReal++;
    	}
   	
   }else{
      	for(var i = 0; i != games.length; i++){
      	if(message == games[i].getId()){
      		var tempId = games[i].getId()
      		var temp = games[i].getSolution();
      		var tempPlayer = new IsPlaying(tempId, ws);
      		players[activePlayers] = tempPlayer;
      		activePlayers ++;
      		ws.send(temp);
      		games[i].getCreator().send('-1');
      		return;
      	}
      }
	}
}
}
});
	ws.on('close', function incoming(message) {
		console.log("Got the closing part!")
		for(var z = 0; z != activePlayers; z++){
			if(players[z].getPlayer() == ws){
				console.log("Player found!")
				gameId = players[z].getGameId();
				console.log(gameId);
				for(var y = 0; y != active; y++){
					if(games[y].getId() == gameId){
						console.log("I'm trying to send it!")
						games[z].getCreator().send(-3);
					}
				}
			}
		}
	});

	
});

app.get("/play", indexRouter);
app.get("/", indexRouter);

server.listen(port);
