function Input(){
	this.keys = [];
	this.down = [];

	this.addKey = function(keyCode, callback){
		this.keys[keyCode] = callback;
		this.down[keyCode] = false;
	};

	var obj = this;
	var handlekeydown = function(event){
		var e = event || window.event;
		var key = e.which || e.keyCode;

		if(typeof(obj.keys[key]) != "undefined"){
			obj.down[key] = true;

			if(typeof(obj.keys[key].callDown) != "undefined"){
				obj.keys[key].callDown();
			}
		}

		return false;
	};

	var handlekeyup = function(event){
		var e = event || window.event;
		var key = e.which || e.keyCode;

		if(typeof(obj.keys[key]) != "undefined"){
			obj.down[key] = false;

			if(typeof(obj.keys[key].callUp) != "undefined"){
				obj.keys[key].callUp();
			}
		}

		return false;
	};

	// var handlekeypress = function(event){
	// 	var e = event || window.event;
	// 	var key = e.which || e.keyCode;

	// 	if(typeof(obj.keys[key]) != "undefined" && typeof(obj.keys[key].callPress) != "undefined"){
	// 		obj.keys[key].callPress();
	// 	}

	// 	return false;
	// }

	window.addEventListener('keydown', handlekeydown);
	window.addEventListener('keyup', handlekeyup);
	// window.addEventListener('keypress', handlekeypress);
}
