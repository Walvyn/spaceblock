function UI(){
    this.lifeBar = new Entity({'width': 250, 'height': 25}, {'x': canvas.width, 'y': 15}, 'GHOST', false, 0);
    this.lifeBar.pos.x -= (this.lifeBar.size.width + 15);
    this.lifeBar.params = {
        'fillSize': this.lifeBar.size.width,
        'actualSize': this.lifeBar.size.width
    };

    this.draw = function(context, ship){
        this.drawLifeBar(context, ship);
        this.drawScore(context, ship);
    };

    this.drawLifeBar = function(context, ship){
        var size = this.lifeBar.size.width * (((ship.life.current * 100) / ship.life.max) / 100);

        if(size != this.lifeBar.params.fillSize){
            this.lifeBar.params.fillSize = size;
        }

        if(this.lifeBar.params.fillSize < this.lifeBar.params.actualSize){
            this.lifeBar.params.actualSize -= params.other.speedAnimation;

            if(this.lifeBar.params.fillSize > this.lifeBar.params.actualSize){
                this.lifeBar.params.actualSize = this.lifeBar.params.fillSize;
            }
        } else if(this.lifeBar.params.fillSize > this.lifeBar.params.actualSize){
            this.lifeBar.params.actualSize += params.other.speedAnimation;

            if(this.lifeBar.params.fillSize < this.lifeBar.params.actualSize){
                this.lifeBar.params.actualSize = this.lifeBar.params.fillSize;
            }
        }

        context.font = params.other.font;
        context.fillStyle = params.color.lifeBar.text;
        context.fillText(params.text.lifeBar, this.lifeBar.pos.x - 70, this.lifeBar.pos.y + this.lifeBar.size.height - 2);

        context.beginPath();
        context.fillStyle = params.color.lifeBar.fill;
        context.rect(this.lifeBar.pos.x, this.lifeBar.pos.y, this.lifeBar.params.actualSize, this.lifeBar.size.height);
        context.fill();
        context.closePath();

        context.beginPath();
        context.strokeStyle = params.color.lifeBar.stroke;
        context.lineWidth = params.other.lineWidth;
        context.rect(this.lifeBar.pos.x, this.lifeBar.pos.y, this.lifeBar.size.width, this.lifeBar.size.height);
        context.stroke();
    };

    this.drawScore = function(context, ship){
        context.font = params.other.font;
        context.fillStyle = params.color.lifeBar.text;
        context.fillText(params.text.score + Math.floor(ship.score * 1000), 10, this.lifeBar.pos.y + 20);
    };
}
