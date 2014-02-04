if(typeof Object.create !=='function'){
	Object.create = function (o) {
		var F = function(){};
		F.prototype = o;
		return new F();
	};
}
var winner=""
var player 	=[]
person={"name":"Player",
			"accuracy":0.75,
			"stamina":.5}

var spawnPlayers = function(numberOfPlayers){
	for(i=0;i<numberOfPlayers;i++){
		player[i] = Object.create(person)
		player[i].name=player[i].name+i
		player[i].accuracy=Math.random()
		player[i].stamina=Math.random()
		player[i].hits=0
		player[i].kills=0
	}
}

var fight = function(){	
	for(i=0;i<player.length;i++){
		//for each player randomly select a target
		target=Math.floor(Math.random()*player.length)
		do{if(target===i){target=Math.floor(Math.random()*player.length)}
		}while(target===i)
		// and fire at them
		
		if(Math.random()>.25){	//each shot has default 75% chance to hit
			// multiply by accuracy and compare to stamina, if accuracy > stamina then hit
			//a low stamina player is easy to hit even with very little accuracy
			if(player[i].accuracy>player[target].stamina){
				//player hits target so increment players kills and targets hits
				player[i].kills++
				player[target].hits++
			}else{
				//target loses stamina if they don't get hit
				if(player[target].stamina>0){player[target].stamina -=.05}else{player[target].stamina=0}
			}
		}		
		if(player[i].kills===200){winner=player[i].name}
	}
}

// spawn us some heroes
spawnPlayers(50)

// run the battle simulation
do{fight()}while(winner==="")

for(i=0;i<player.length;i++){
	console.log(player[i].name + " Hits = " + player[i].hits + " Kills = " + player[i].kills + " Accuracy = " + player[i].accuracy + " Stamina = " + player[i].stamina)
	console.log("The winner is " + winner)
}
