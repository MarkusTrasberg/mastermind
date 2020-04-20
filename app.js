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
var played = 0;
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
		ws.send(played);
	}else{

	if(isNaN(message) ) {
	if(message[0] === '-'){
		played++;
		activeReal--;
		for(var q = 0; q != active; q++){
      		if(message[3] == games[q].getId()){
      			try{
      			games[q].getCreator().send(message);
      		}catch{
      			console.log("Creator is offline!");
      		}
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
      		try{
      		games[i].getCreator().send('-1');
      	}catch{
      		console.log("Creator is offline!");
      	}
      		return;
      	}
      }
	}
}
}
});
	ws.on('close', function incoming(message) {
		for(var z = 0; z != activePlayers; z++){
			if(players[z].getPlayer() == ws){
				gameId = players[z].getGameId();
				for(var y = 0; y != active; y++){
					if(games[y].getId() == gameId){
						try{
						games[z].getCreator().send(-3);
					}catch{
						console.log("Creator is offline!");
					}
					}
				}
			}
		}
	});

	
});

app.get("/play", indexRouter);
app.get("/", indexRouter);
app.set('view engine', 'ejs')
app.get('/', function(req, res) {
	res.render('splash.ejs', { gamesActive: activeReal, gamesPlayed: active });
})




server.listen(port);
