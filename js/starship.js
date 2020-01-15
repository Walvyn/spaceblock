function Starship(width, height){
	var ratio = 20;
	var speed = 5.5;
	var reduction = 1.3;
	var life = 100;

	Entity.apply(this, [{'width': width * ratio, 'height': height * ratio}, {'x': (canvas.width / 2) - ((width * ratio) / 2), 'y': (canvas.height / 2) - ((height * ratio) / 2)}, 'BLOCK', true, 1]);

	for (var i = 0; i < this.shape.length; i++){
		for (var j = 0; j < this.shape[i].length; j++) {
			if(this.shape[i][j] === 1){
				this.shape[i][j] = new Entity({'width': ratio, 'height': ratio}, {'x': this.pos.x + (j * ratio), 'y': this.pos.y + (i * ratio)}, 'BLOCK', false, 0);
			} else {
				this.shape[i][j] = null;
			}
		}
	}

	this.score = 0;
	this.life = {
		'current': life,
		'max': life
	};

	this.draw = function(context){
		this.score += this.level;

		context.save();
		context.beginPath();
		context.fillStyle = params.color.ship;

		for(var i = 0; i < this.shape.length; i++){
			for(var j = 0; j < this.shape[i].length; j++){
				if(this.shape[i][j] !== null){
					context.rect(this.shape[i][j].pos.x, this.shape[i][j].pos.y, this.shape[i][j].size.width, this.shape[i][j].size.height);
				}
			}
		}

		context.fill();
		context.closePath();
		context.restore();
	};

	this.setPos = function(x, y){
		this.pos.x += x;
		this.pos.y += y;

		for(var i = 0; i < this.shape.length; i++){
			for(var j = 0; j < this.shape[i].length; j++){
				if(this.shape[i][j] !== null){
					this.shape[i][j].pos.x += x;
					this.shape[i][j].pos.y += y;
				}
			}
		}
	};

	this.move = function(){
		var dep = {
			'x': 0,
			'y': 0
		};

		if(input.down[params.keys.right]){
			if(input.down[params.keys.down] && !input.down[params.keys.top] && !input.down[params.keys.left]){
				dep.x = speed / reduction;
				dep.y = speed / reduction;
			} else if(!input.down[params.keys.down] && input.down[params.keys.top] && !input.down[params.keys.left]) {
				dep.x = speed / reduction;
				dep.y = (speed / reduction) * (-1);
			} else if(!input.down[params.keys.down] && !input.down[params.keys.top] && !input.down[params.keys.left]) {
				dep.x = speed;
			}
		} else if(input.down[params.keys.left]){
			if(input.down[params.keys.down] && !input.down[params.keys.top] && !input.down[params.keys.right]){
				dep.x = (speed / reduction) * (-1);
				dep.y = speed / reduction;
			} else if(!input.down[params.keys.down] && input.down[params.keys.top] && !input.down[params.keys.right]) {
				dep.x = (speed / reduction) * (-1);
				dep.y = (speed / reduction) * (-1);
			} else if(!input.down[params.keys.down] && !input.down[params.keys.top] && !input.down[params.keys.right]) {
				dep.x = speed * (-1);
			}
		} else if(input.down[params.keys.top]){
			if(input.down[params.keys.right] && !input.down[params.keys.left] && !input.down[params.keys.down]){
				dep.x = speed / reduction;
				dep.y = (speed / reduction) * (-1);
			} else if(!input.down[params.keys.right] && input.down[params.keys.left] && !input.down[params.keys.down]) {
				dep.x = (speed / reduction) * (-1);
				dep.y = (speed / reduction) * (-1);
			} else if(!input.down[params.keys.right] && !input.down[params.keys.left] && !input.down[params.keys.down]) {
				dep.y = speed * (-1);
			}
		} else if(input.down[params.keys.down]){
			if(input.down[params.keys.right] && !input.down[params.keys.left] && !input.down[params.keys.top]){
				dep.x = speed / reduction;
				dep.y = speed / reduction;
			} else if(!input.down[params.keys.right] && input.down[params.keys.left] && !input.down[params.keys.top]) {
				dep.x = (speed / reduction) * (-1);
				dep.y = speed / reduction;
			} else if(!input.down[params.keys.right] && !input.down[params.keys.left] && !input.down[params.keys.top]) {
				dep.y = speed;
			}
		}

		for(var i = 0; i < this.shape.length; i++){
			for(var j = 0; j < this.shape[i].length; j++){
				if(this.shape[i][j] !== null){
					this.shape[i][j].pos.x += dep.x;
					this.shape[i][j].pos.y += dep.y;

					if(this.shape[i][j].pos.x < j * ratio){
						this.shape[i][j].pos.x = j * ratio;
					} else if(this.shape[i][j].pos.x > (canvas.width - this.size.width) + (j * ratio)){
						this.shape[i][j].pos.x = (canvas.width - this.size.width) + (j * ratio);
					}

					if(this.shape[i][j].pos.y < i * ratio){
						this.shape[i][j].pos.y = i * ratio;
					} else if(this.shape[i][j].pos.y > (canvas.height - this.size.height) + (i * ratio)){
						this.shape[i][j].pos.y = (canvas.height - this.size.height) + (i * ratio);
					}


			        if(typeof(Entity.entities[1]) !== "undefined"){
			            for(var k = 0; k < Entity.entities[1].length; k++){
			                if(this != Entity.entities[1][k]){
								if(this.shape[i][j].colision(Entity.entities[1][k])){
									var damage = Entity.entities[1][k].damage;
									Entity.entities[1][k].destroy();
									this.takeDomage(damage);
								}
							}
						}
					}
				}
			}
		}

		this.pos.x += dep.x;
		this.pos.y += dep.y;

		if(this.pos.x < 0){
			this.pos.x = 0;
		} else if(this.pos.x > canvas.width - this.size.width){
			this.pos.x = canvas.width - this.size.width;
		}

		if(this.pos.y < 0){
			this.pos.y = 0;
		} else if(this.pos.y > canvas.height - this.size.height){
			this.pos.y = canvas.height - this.size.height;
		}
	};

	this.takeDomage = function(damage){
		if(this.life.current > 0){
			this.life.current -= damage;

			if(this.life.current <= 0){
				this.destroy();
			}
		}
	};
}

function Hunter(v){

	this.level = 0.001;

	if(v == version.CHEAP){
		this.shape = [
			[1,0,1,0],
			[1,1,1,1],
			[1,0,1,0]
		];
	} else if(v == version.DEAR) {
		this.shape = [
			[1,1,0,0],
			[0,1,1,1],
			[1,1,0,0]
		];
	} else if(v == version.LUXURY) {
		this.shape = [
			[1,1,0,1],
			[0,1,1,1],
			[1,1,0,1]
		];
	} else {
		return false;
	}

	Starship.apply(this, [this.shape[0].length, this.shape.length]);
}

function Frigate(v){

	this.level = 0.002;

	if(v == version.CHEAP){
		this.shape = [
			[1,1,1,1,0],
			[1,0,0,1,1],
			[1,0,0,1,1],
			[1,1,1,1,0]
		];
	} else if(v == version.DEAR) {
		this.shape = [
			[1,0,0,1,0],
			[1,1,1,1,1],
			[1,1,1,1,1],
			[1,0,0,1,0]
		];
	} else if(v == version.LUXURY) {
		this.shape = [
			[1,1,0,1,1],
			[0,1,1,1,0],
			[0,1,1,1,0],
			[1,1,0,1,1]
		];
	} else {
		return false;
	}

	Starship.apply(this, [this.shape[0].length, this.shape.length]);
}

function Destroyer(v){

	this.level = 0.003;

	if(v == version.CHEAP){
		this.shape = [
			[0,1,0,0,0,0],
			[1,1,1,1,0,0],
			[0,1,1,1,1,1],
			[1,1,1,1,0,0],
			[0,1,0,0,0,0]
		];
	} else if(v == version.DEAR) {
		this.shape = [
			[1,1,1,1,0,0],
			[0,1,1,1,1,0],
			[0,0,1,0,1,1],
			[0,1,1,1,1,0],
			[1,1,1,1,0,0]
		];
	} else if(v == version.LUXURY) {
		this.shape = [
			[1,1,1,1,0,0],
			[0,0,1,1,1,1],
			[0,1,1,0,1,0],
			[0,0,1,1,1,1],
			[1,1,1,1,0,0]
		];
	} else {
		return false;
	}

	Starship.apply(this, [this.shape[0].length, this.shape.length]);
}
