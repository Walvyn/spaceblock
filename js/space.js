function Space(){
	var asteroid = {
		'width': 20,
		'height': 20
	};

	this.asteroids = [];
	this.blackHoles = [];
	this.level = 1;

	// tmp
	// this.asteroids.push(new Asteroid({'width': 20, 'height': 20}, {'x': 1000, 'y': 70}));
	// this.blackHoles.push(new BlackHole(8, {'x': 500, 'y': 50}));

	this.draw = function(context){
		for(var i = 0; i < this.asteroids.length; i++){
			this.asteroids[i].draw(context);
		}

		for(var j = 0; j < this.blackHoles.length; j++){
			this.blackHoles[j].draw(context);
		}
	};

	this.move = function(){
		var index = -1;
		for(var i = 0; i < this.asteroids.length; i++){
			if(!this.asteroids[i].delete){
				this.asteroids[i].move();

				if(this.asteroids[i].pos.x < -100 || this.asteroids[i].pos.x > canvas.width + 100 || this.asteroids[i].pos.y < -100 || this.asteroids[i].pos.y > canvas.height + 100){
					index = Entity.entities[1].indexOf(this.asteroids[i]);

					if(index != -1){
						Entity.entities[1].splice(index, 1);
						this.asteroids.splice(i, 1);
					}
				}
			} else {
				this.asteroids.splice(i, 1);
			}
		}

		for(var j = 0; j < this.blackHoles.length; j++){
			this.blackHoles[j].aspiration();
		}
	};

	this.generate = function(ship){
		if(this.asteroids.length < ship.score){
			var x = Math.floor((Math.random() * 99) + 1);
			var y = Math.floor((Math.random() * canvas.height - asteroid.height) + asteroid.height);

			var thurst = {
				'x': Math.floor((Math.random() * 6) + 4) * -1,
				'y': 0
			};

			this.asteroids.push(new Asteroid({'width': asteroid.width, 'height': asteroid.height}, {'x': x + canvas.width, 'y': y}, thurst));
		}
	};
}
