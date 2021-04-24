/*
* @Author: ASUS
* @Date:   2021-04-15 22:24:43
* @Last Modified by:   ASUS
* @Last Modified time: 2021-04-16 17:01:44
*/
// 要根据代码函数调用的次序来决定前后顺序
// 说明，用来练习继承的用法，实际上由于参数比较少，不建议使用
// ----------------------- tool.js--------------------------
(function (window, undefined) {
	var ToolRandom = {
		getRandom: function (min, max) {
			return Math.floor(Math.random()*(max - min + 1) + min);
		}
	}; 
	window.ToolRandom = ToolRandom;
})(window, undefined);

// ----------------------- parent---------------------------
(function (window, undefined) {
	function Parent(options) {
		options = options || {};
		this.width = options.width || 20;
		this.height = options.height || 20;
	}

	Parent.prototype.test = function () {
		console.log('i am test');
	}
	window.Parent = Parent;
})(window, undefined);

// ----------------------- food.js--------------------------
(function (window, undefined) {
		// food.js
	function Food(foodObj) {
		foodObj = foodObj || '';
		// this.width = foodObj.width || 20;
		// this.height = foodObj.height || 20;
		this.color = foodObj.color || 'red';
		this.x = foodObj.x || 0;
		this.y = foodObj.y || 0;
		Parent.call(this, foodObj);
	}
	Food.prototype = new Parent();
	Food.prototype.constructor = Food;

	var position = 'absolute';
	// 记录上一次的食物
	var foodDivArray = [];

	// 这个函数是在原型链上的，不是说在某个局部函数中，或者文件的
	Food.prototype.render = function (map) {
		// 刷新食物前把之前的食物先清掉
		remove();

		var divfood = document.createElement('div');
		foodDivArray.push(divfood);
		map.appendChild(divfood);
		this.x = ToolRandom.getRandom(0, map.clientWidth / this.width -1) * this.width;
		this.y = ToolRandom.getRandom(0, map.clientHeight / this.height -1) * this.height;

		divfood.style.width = this.width + 'px';
		divfood.style.height = this.height + 'px';
		divfood.style.backgroundColor = this.color;
		divfood.style.left = this.x + 'px';
		divfood.style.top = this.y + 'px';
		divfood.style.position = position;
	}
	function remove() {
		// splice删除之后，数组的元素会向前移动，如果i没处理的话，从前到后的遍历会出问题。从后往前遍历就ok
		for (var i = foodDivArray.length - 1; i >= 0; i--) {
			foodDivArray[i].parentNode.removeChild(foodDivArray[i]);
			foodDivArray.splice(i, 1);
		} 
	}
	window.Food = Food;
})(window, undefined);

// ----------------------- snake.js--------------------------
(function (window, undefined) {
	// 蛇节
	function Snake(options) {
		options = options || '';
		// this.width = options.width || 20;
		// this.height = options.height || 20;
		this.direction = options.direction || 'right';
		this.body = [
		// x 代表的是距离left多少个蛇节
			{x: 3, y: 2, color: 'red'},
			{x: 2, y: 2, color: 'blue'},
			{x: 1, y: 2, color: 'blue'},
		];
		Parent.call(this, options);
	}

	Snake.prototype = new Parent();
	Snake.prototype.constructor = Snake;
	var position = 'absolute';
	var snakeArray = [];
	Snake.prototype.render = function (map) {
		//清除一下之前的蛇身
		remove();
		for (var i = 0, len = this.body.length; i < len; i++) {
			var snakeDiv = document.createElement('div');
			map.appendChild(snakeDiv);
			snakeArray.push(snakeDiv);
		
			snakeDiv.style.width = this.width + 'px';
			snakeDiv.style.height = this.height + 'px';
			snakeDiv.style.left = this.body[i].x * this.width + 'px';
			snakeDiv.style.top = this.body[i].y * this.height + 'px';
			snakeDiv.style.backgroundColor = this.body[i].color;
			snakeDiv.style.position = position;
		}
	}
	Snake.prototype.move = function (food, map) {
		// 蛇身移动
		for (var i = this.body.length - 1; i >= 1; i--) {
			this.body[i].x = this.body[i - 1].x;
			this.body[i].y = this.body[i - 1].y;
 		}
 		// 蛇头
 		var head = this.body[0];
 		var direction = this.direction;
 		switch(direction) {
 			case 'right':
 				head.x++;
 				break;
 			case 'left':
 				head.x--;
 				break;
 			case 'top':
 				head.y--;
 				break;
 			case 'down':
 			// 向下的坐标是越来越大的
 				head.y++;
 				break;
 		}

 		// 蛇吃掉食物，蛇头与食物重叠的时候，来判断比较简单，不要考虑去与食物的边缘碰撞，这样麻烦很多
 		var snakeHeadX = head.x * this.width;
 		var snakeHeadY = head.y * this.height;
 		if (snakeHeadX === food.x && snakeHeadY === food.y) {
 			var last = this.body[this.body.length - 1];
 			this.body.push({
 				x: last.x,
 				y: last.y,
 				color: last.color
 			});
 			// this.body.push(last);这样会导致数据一直同步,他们会一直重叠在一起
 			food.render(map);
 		}

	}
	function remove() {
		for (var i = snakeArray.length - 1; i >= 0; i--) {
			snakeArray[i].parentNode.removeChild(snakeArray[i]);
			snakeArray.splice(i, 1);
			// splice会引起数组整体往前移动，从后往前比较容易处理
		}
	}

	window.Snake = Snake;
	

})(window, undefined);

// ----------------------- game.js--------------------------
(function (window, undefined) {
	var that;
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }
    Game.prototype.start = function () {
        // 1、先渲染对象
        this.food.render(this.map);
        this.snake.render(this.map);
        // 2、处理游戏的逻辑---移动蛇---蛇碰撞检测---键盘控制蛇---蛇吃食物
         snakeRunning();
         keyBoardClick();
    }
    function snakeRunning() {
     	var timeFlag = setInterval(function () {
     		this.snake.move(this.food, this.map);
     		this.snake.render(this.map);
     		// 碰撞检测
         	var snakeHead = this.snake.body[0];
         	// 单词写错了
         	var maxX = this.map.clientWidth / this.snake.width;
         	var maxY = this.map.clientHeight / this.snake.height;
         	
         	if (snakeHead.x < 0 || snakeHead.x >= maxX) {
         		clearInterval(timeFlag);
         		timeFlag = null;
         	} 
         	if (snakeHead.y < 0 || snakeHead.y >= maxY) {
         		clearInterval(timeFlag);
         		timeFlag = null;
         	} 
     	}.bind(that),200);
     }
     function keyBoardClick() {
     	// 键盘事件是整个文档的
     	// document.onkeydown
     	document.addEventListener('keydown',function (e) {
     		e = e || window.event;
     		// console.log(e.keyCode);
     		switch (e.keyCode) {
     			case 38:
     				this.snake.direction = 'top';
     				break;
     			case 39:
     				this.snake.direction = 'right';
     				break;
     			case 40:
     				this.snake.direction = 'down';
     				break;
     			case 37:
     				this.snake.direction = 'left';
     				break;
     		}
     	}.bind(that),false);
     }

    window.Game = Game;
})(window, undefined);

// ----------------------- main.js--------------------------
(function (window, undefined) {
	 var map = document.getElementById('map');
     var game = new Game(map);
     game.start();
})(window, undefined);