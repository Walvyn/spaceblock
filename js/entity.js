function Entity(size, pos, type, gravity, room, camera){

	if(typeof(Entity.entities) == "undefined"){
		Entity.entities = [];
	}

	if(typeof(Entity.entities[room]) == "undefined"){
		Entity.entities[room] = new Array(this);
	} else {
		Entity.entities[room].push(this);
	}

	if(typeof(camera) == "undefined"){
		this.camera = false;
	} else {
		this.camera = true;
	}

	this.size = size;
	this.pos = pos;

	this.structure = type;
	this.gravity = gravity;

	this.aspiration = false;
	this.delete = false;

	this.room = room;

	this.destroy = function(){
		this.delete = true;
		var index = Entity.entities[this.room].indexOf(this);

		if(index != -1){
			Entity.entities[this.room].splice(index, 1);
		}
	};

	this.colision = function(entity){
		if(entity.structure != 'GHOST' && this.structure != 'GHOST'){
			tPosX = this.pos.x;
			tPosY = this.pos.y;
			tSizeW = tPosX + this.size.width;
			tSizeH = tPosY + this.size.height;
			if(entity.structure == 'HOLE'){
				tPosX = tPosX + (this.size.width / 2);
				tPosY = tPosY + (this.size.height / 2);
				tSizeW = tPosX;
				tSizeH = tPosY;
			}

			ePosX = entity.pos.x;
			ePosY = entity.pos.y;
			eSizeW = ePosX + entity.size.width;
			eSizeH = ePosY + entity.size.height;
			if(this.structure == 'HOLE') {
				ePosX = ePosX + (entity.size.width / 2);
				ePosY = ePosY + (entity.size.height / 2);
				eSizeW = ePosX;
				eSizeH = ePosY;
			}

			if(tPosX <= ePosX && tSizeW >= ePosX){
				if(tPosY <= ePosY && tSizeH >= ePosY){
					return true;
				}

				if(tPosY >= ePosY && eSizeH >= tPosY){
					return true;
				}
			}

			if(tPosX >= ePosX && eSizeW >= tPosX){
				if(tPosY <= ePosY && tSizeH >= ePosY){
					return true;
				}

				if(tPosY >= ePosY && eSizeH >= tPosY){
					return true;
				}
			}
		}

		return false;
	};
}
