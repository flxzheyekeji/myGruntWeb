/**
 * Created by Administrator on 2017/1/29.
 */
console.log('--------------------------多态,封装------------------------------');
var makeSound = function(animal){
	animal.sound();
}

function dark(){
	//throw "dark Error！"
};

dark.prototype.sound = function(){
	console.log("嘎嘎嘎");
};

function chicken(){
	//throw "chicken Error！"
};

chicken.prototype.sound = function(){
	console.log("咯咯咯");
};

makeSound(new dark());
makeSound(new chicken());

console.log('--------------------------this，call，apply------------------------------');
Function.prototype.bind = function(){
	var self = this;
	var context = [].shift.call(arguments);
	var args = [].slice.call(arguments);
	return function(){
		return self.call(context,[].concat.call(args,[].slice.call(arguments)));
	}
};
var this_obj = {
	name:"jili"
};

var func = function(){
	console.log(this.name);
}.bind(this_obj);

func();

console.log('--------------------------闭包高阶函数------------------------------');
function isType(type){
	return function(obj){
		return Object.prototype.toString.call(obj) === "[object " + type + "]"
	}
}

var isArray = isType("Array");
console.log(isArray([1,2,3]));


console.log("------------------柯里化--------------------");
function keli(){
	if(arguments.length == 3){
		return arguments[0] + arguments[1];
	}else{
		return arguments.callee
	}
}
//这是我理解的柯里化，太片面。
function currying(fn){
	var arg = [];
	return function(){
		if(arguments.length == 0){
			return fn.apply(this,arg);
		}else{
			[].push.apply(arg,arguments);
			return arguments.callee;
		}
	}
}

function cost(){
	var money = 0;
	return function(){
		for(var i = 0 ; i<arguments.length; i++){
			money += arguments[i];
		}
		return money;
	}
}
//cost = currying(cost());
//cost(100);
//cost(200);
//cost(300);
//console.log(cost());

console.log("------------------函数节流--------------------");
function throttle(fn,interval){
	var timer,first;
	return function(){
		var args = arguments;
		var _m = this;
		if(!first){
			first = false;
			fn.call(_m,args)
		}
		if(timer){
			return;
		}else{
			timer = window.setTimeout(function(){
				clearTimeout(timer);
				timer = null;
				fn.call(_m,args)
			},interval || 500)
		}
	}
}













