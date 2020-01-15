function Asteroid(size, pos, thurst){
	var rotation = 1;

	Entity.apply(this, [size, pos, 'BLOCK', true, 1, true]);

	this.deg = 0;
	this.damage = 20;
	this.thurst = thurst;

	this.draw = function(context){
		if(!this.delete){
			this.deg += rotation;

			context.save();
			context.translate(this.pos.x + (this.size.width / 2), this.pos.y + (this.size.height / 2));
			context.rotate(this.deg * Math.PI / 180);

			context.beginPath();
			context.fillStyle = params.color.asteroid;
			//context.rect(this.pos.x - camera.pos.x, this.pos.y - camera.pos.y, this.size.width, this.size.height);
			context.rect((this.size.width / 2) * (-1), (this.size.height / 2) * (-1), this.size.width, this.size.height);
			context.fill();
			context.closePath();

			context.restore();
		}
	};

	this.move = function(){
		this.pos.x += this.thurst.x;
		this.pos.y += this.thurst.y;
	};

	this.setPos = function(x, y){
		// this.pos.x += x;
		// this.pos.y += y;

		// if(x === 0){
		// 	if(y > 0){
		// 		if(this.aspiration === BlackHole.getCadran('top-left')){
		// 			this.thurst.y
		// 		}
		// 	}
		// }

		this.thurst.x += x;
		this.thurst.y += y;
	};
}
