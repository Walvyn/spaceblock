// Variables

var canvas = document.getElementById('playZone');
var context = canvas.getContext('2d');

var type = {
	'HUNTER': 0,
	'FRIGATE': 1,
	'DESTROYER': 2
};

var version = {
	'CHEAP': 0,
	'DEAR': 1,
	'LUXURY': 2
};

var params = {
	'other': {
		'lineWidth': 3,
		'speedAnimation': 5,
		'font': '28px Georgia'
	},
	'text': {
		'lifeBar': 'Life :',
		'score': 'Score : '
	},
	'color': {
		'ship': '#444444',
		'back': 'white',
		'asteroid': 'black',
		'lifeBar': {
			'fill': '#FF3333',
			'stroke': 'black',
			'text': '#444444'
		}
	},
	'keys': {
		'right': 39,
		'left': 37,
		'top': 38,
		'down': 40
	}
};

var choice = {
	'type': 0,
	'version': 0
};

// choix du joueur (type)
choice.type = type.FRIGATE;
// choix du joueur (version)
choice.version = version.LUXURY;

var input = new Input();
var space = new Space();
var ui = new UI();
var ship = null;

if(type.HUNTER == choice.type){
	ship = new Hunter(choice.version);
} else if(type.FRIGATE == choice.type){
	ship = new Frigate(choice.version);
} else if(type.DESTROYER == choice.type){
	ship = new Destroyer(choice.version);
} else {
	console.log('stop');
}

input.addKey(params.keys.right, {});
input.addKey(params.keys.left, {});
input.addKey(params.keys.top, {});
input.addKey(params.keys.down, {});

var requestAnimFrame = (function(callback){
    return 	window.requestAnimationFrame ||
	        window.webkitRequestAnimationFrame ||
        	window.mozRequestAnimationFrame ||
        	window.oRequestAnimationFrame ||
        	window.msRequestAnimationFrame ||
        	function(callback){
            	window.setTimeout(callback, 1000 / 60);
        	};
})();

animate();

function animate(){
	//clear
	context.clearRect(0, 0, canvas.width, canvas.height);

	// Fond
	context.beginPath();
	context.strokeStyle = params.color.back;
	context.fillStyle = params.color.back;
	context.rect(0, 0, canvas.width, canvas.height);
	context.stroke();
	context.fill();

	ui.draw(context, ship);

	if(!ship.delete){
		space.generate(ship);
		space.move();
		space.draw(context);
		ship.move();
		ship.draw(context);
	}

	requestAnimFrame(function(){ animate(); });
}
