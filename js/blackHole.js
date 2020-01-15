function BlackHole(force, pos){
    var rotation = 20;
    var radius = 50;
    var attraction = 0.8;
    var cadran = {
        'top-left': 0,
        'top-right': 1,
        'bottom-left': 2,
        'bottom-right': 3,
        'top-center': 4,
        'bottom-center': 5,
        'left-center': 6,
        'right-center': 7,
        'center': 8
    };

    BlackHole.getCadran = function(c){
        if(typeof(cadran[c]) !== "undefined"){
            return cadran[c];
        }

        return false;
    };

    Entity.apply(this, [{'width': force * radius, 'height': force * radius}, pos, 'HOLE', false, 0]);

    this.core = new Entity({'width': radius, 'height': radius}, {'x': pos.x + (((force - 1) * radius) / 2), 'y': pos.y + (((force - 1) * radius) / 2)}, 'HOLE', false, 2);

	this.deg = 0;
    this.force = force;

    this.draw = function(context){
		this.deg -= rotation;

		context.save();
		context.translate(this.pos.x + (this.size.width / 2), this.pos.y + (this.size.height / 2));
		context.rotate(this.deg * Math.PI / 180);

		context.beginPath();
		context.fillStyle = params.color.asteroid;
		//context.rect(this.pos.x - camera.pos.x, this.pos.y - camera.pos.y, x, x);
        context.rect((this.core.size.width / 2) * (-1), (this.core.size.height / 2) * (-1), this.core.size.width, this.core.size.height);
		context.fill();
		context.closePath();

		context.restore();

        // carre représentant les zones
        // for(var i = 0; i < this.force; i++){
        //     context.strokeStyle = params.color.asteroid;
        //     context.rect(this.pos.x + (i * (radius / 2)), this.pos.y + (i * (radius / 2)), this.size.width - (i * radius), this.size.height - (i * radius));
        //     context.stroke();
        // }
	};

    this.aspiration = function(){
        if(typeof(Entity.entities[1]) !== "undefined"){
            for(var i = 0; i < Entity.entities[1].length; i++){
                if(this != Entity.entities[1][i] && Entity.entities[1][i].gravity){
                    if(this.colision(Entity.entities[1][i])){
                        var ePosX = Entity.entities[1][i].pos.x + (Entity.entities[1][i].size.width / 2);
                        var ePosY = Entity.entities[1][i].pos.y + (Entity.entities[1][i].size.height / 2);

                        var cPosX = this.core.pos.x + (this.core.size.width / 2);
                        var cPosY = this.core.pos.y + (this.core.size.height / 2);

                        var c = null;
                        if(ePosX < cPosX){
                            if(ePosY < cPosY){
                                c = cadran['top-left'];
                            } else if(ePosY > cPosY) {
                                c = cadran['bottom-left'];
                            } else {
                                c = cadran['left-center'];
                            }
                        } else if(ePosX > cPosX) {
                            if(ePosY < cPosY){
                                c = cadran['top-right'];
                            } else if(ePosY > cPosY) {
                                c = cadran['bottom-right'];
                            } else {
                                c = cadran['right-center'];
                            }
                        } else {
                            if(ePosY < cPosY){
                                c = cadran['top-center'];
                            } else if(ePosY > cPosY) {
                                c = cadran['bottom-center'];
                            } else {
                                c = cadran.center;
                            }
                        }

                        if(c == cadran.center){
                            Entity.entities[1][i].destroy();
                        } else {
                            var dec = {
                                'x': 0,
                                'y': 0
                            };

                            switch(c){
                                case cadran['top-center']:
                                    if(Entity.entities[1][i].aspiration === cadran['top-left']){
                                        dec.x = ePosX - this.pos.x;
                                    } else {
                                        dec.x = (this.pos.x + this.size.width) - ePosX;
                                    }

                                    dec.y = ePosY - this.pos.y;
                                    break;

                                case cadran['left-center']:
                                    if(Entity.entities[1][i].aspiration === cadran['top-left']){
                                        dec.y = ePosY - this.pos.y;
                                    } else {
                                        dec.y = (this.pos.y + this.size.height) - ePosY;
                                    }

                                    dec.x = ePosX - this.pos.x;
                                    break;

                                case cadran['bottom-center']:
                                    if(Entity.entities[1][i].aspiration === cadran['bottom-left']){
                                        dec.x = ePosX - this.pos.x;
                                    } else {
                                        dec.x = (this.pos.x + this.size.width) - ePosX;
                                    }

                                    dec.y = (this.pos.y + this.size.height) - ePosY;
                                    break;

                                case cadran['right-center']:
                                    if(Entity.entities[1][i].aspiration === cadran['bottom-right']){
                                        dec.y = ePosY - this.pos.y;
                                    } else {
                                        dec.y = (this.pos.y + this.size.height) - ePosY;
                                    }

                                    dec.x = (this.pos.x + this.size.width) - ePosX;
                                    break;

                                case cadran['top-left']:
                                    dec.x = ePosX - this.pos.x;
                                    dec.y = ePosY - this.pos.y;
                                    break;

                                case cadran['top-right']:
                                    dec.x = (this.pos.x + this.size.width) - ePosX;
                                    dec.y = ePosY - this.pos.y;
                                    break;

                                case cadran['bottom-left']:
                                    dec.x = ePosX - this.pos.x;
                                    dec.y = (this.pos.y + this.size.height) - ePosY;
                                    break;

                                case cadran['bottom-right']:
                                    dec.x = (this.pos.x + this.size.width) - ePosX;
                                    dec.y = (this.pos.y + this.size.height) - ePosY;
                                    break;
                            }

                            dec.x /= (radius / 2);
                            dec.y /= (radius / 2);

                            var range = 0;

                            if(dec.x < dec.y){
                                range = Math.ceil(dec.x);
                            } else {
                                range = Math.ceil(dec.y);
                            }

                            if(range == force){
                                Entity.entities[1][i].destroy();
                            } else {
                                var v = {
                                    'h': range * attraction,
                                    'x': 0,
                                    'y': 0
                                };

                                if(c == cadran['bottom-right'] || c == cadran['bottom-left'] || c == cadran['top-left'] || c == cadran['top-right']){
                                    var tanAlpha = Math.abs(ePosY - cPosY) / Math.abs(ePosX - cPosX);
                                    var alpha = Math.atan(tanAlpha) / (Math.PI / 180);
                                    var beta = 90 - alpha;

                                    v.x = v.h * Math.cos(alpha * (Math.PI / 180));
                                    v.y = v.h * Math.cos(beta * (Math.PI / 180));
                                }

                                switch(c){
                                    case cadran['top-center']:
                                        v.y = v.h;
                                        break;

                                    case cadran['left-center']:
                                        v.x = v.h;
                                        break;

                                    case cadran['bottom-center']:
                                        v.y = v.h * (-1);
                                        break;

                                    case cadran['right-center']:
                                        v.x = v.h * (-1);
                                        break;

                                    case cadran['top-right']:
                                        v.x *= -1;
                                        break;

                                    case cadran['bottom-left']:
                                        v.y *= -1;
                                        break;

                                    case cadran['bottom-right']:
                                        v.x *= -1;
                                        v.y *= -1;
                                        break;
                                }

                                Entity.entities[1][i].setPos(v.x, v.y);
                                Entity.entities[1][i].aspiration = c;
                            }
                        }
                    } else {
                        Entity.entities[1][i].aspiration = false;
                    }
                }
            }
        }
    };
}
