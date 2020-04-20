let arr1 = [-1, -1, -1, -1];

let solution = [5, 7, 7, 1]; // player has to quess this array    
let mouseColor = 0;
let round = 0;
solution[0] = Math.floor(Math.random() * 8);
solution[1] = Math.floor(Math.random() * 8);
solution[2] = Math.floor(Math.random() * 8);
solution[3] = Math.floor(Math.random() * 8);


function setMouseColor(colorId){
	mouseColor = colorId;
}

function getMouseColor(){
	return mouseColor;
}

function mouseClick(id){
	if(id-round > 4 || id-round < 1){
		return;
	}
	document.getElementById(String(id)).style.backgroundColor = getColor(mouseColor);
	arr1[id-round-1] = mouseColor;


}

function checkClick(){
	var peggle = 103 + round;
	for(var i = 0; i < 4; i++){
		if(arr1[i] == -1){
			console.log("Fill in the empty spots!")
			return;
		}
	}
	var correct = compareCorrect(arr1, solution);
	if(correct == 4){
		console.log("You won!");
		round = round + 2000;
		document.getElementById("winOrLose").innerHTML = "You won!";
			document.getElementById("backToHome").innerHTML = "Click here to go back.";
			peggle = peggle - 3;
			var temp = 0;
			while(temp != 4){
				document.getElementById(String(peggle)).style.backgroundColor = "green";
				temp++;
				peggle++;
			}
			return;
	}
	var semi = compareSemi(arr1, solution) - correct;

	for(var i = 0; i != correct; i++){
		document.getElementById(String(peggle)).style.backgroundColor = "green";
		peggle--;
	}
	for(var j = 0; j != semi; j++){
		document.getElementById(String(peggle)).style.backgroundColor = "white";
		peggle--;
	}
	var wrong = 4 - correct - semi;

	for(var q = 0; q != wrong; q++){
		document.getElementById(String(peggle)).style.backgroundColor = "red";
		peggle--;
	}

	round = round + 4;
	if(round == 32){
		round = round + 2000;
		document.getElementById("backToHome").innerHTML = "Click here to go back.";
		document.getElementById("winOrLose").innerHTML = "You lost! The right answer is:";
		document.getElementById(String(33)).style.backgroundColor = getColor(solution[0]);
		document.getElementById(String(34)).style.backgroundColor = getColor(solution[1]);
		document.getElementById(String(35)).style.backgroundColor = getColor(solution[2]);
		document.getElementById(String(36)).style.backgroundColor = getColor(solution[3]);
	}
	arr1 = [-1, -1, -1, -1];
	return;


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

function compareCorrect(arr, arr2) { // checks if ball is correct color and correct position, returns int
    let correct = 0;
    if (arr[0] == arr2[0]) {
        correct++;
    }
    
    if (arr[1] == arr2[1]) {
        correct++;
    }
    
    if (arr[2] == arr2[2]) {
        correct++;
    }
    
    if (arr[3] == arr2[3]) {
        correct++;
    }
    return correct;
}

function compareSemi(arr, arr2) { // checks if ball is correct color, returns int
	var arr3 = [-1,-1,-1,-1];
	for(var z = 0; z != 4; z++){
		arr3[z] = arr2[z];
	}	
    let semi = 0;
    for (var i = 0; i < arr3.length; i++) {
        for (var j = 0; j < arr.length; j++) {
            if (arr[i] == arr3[j]) {
                semi++;
                arr3[j] = -1;
                break;
            }   
        }
    }
    return semi;
}
