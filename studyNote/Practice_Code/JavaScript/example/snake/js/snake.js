/*
* @Author: ASUS
* @Date:   2021-04-14 17:41:43
* @Last Modified by:   ASUS
* @Last Modified time: 2021-04-15 16:04:19
*/

/*能否来直接对数组中的标签元素进行偏移就行？*/

(function () {
	// 蛇节
	function Snake(options) {
		options = options || '';
		this.width = options.width || 20;
		this.height = options.height || 20;
		this.direction = options.direction || 'right';
		this.body = [
		// x 代表的是距离left多少个蛇节
			{x: 3, y: 2, color: 'red'},
			{x: 2, y: 2, color: 'blue'},
			{x: 1, y: 2, color: 'blue'},
		];
	}
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
	

})();

/*var map = document.getElementById('map');
var snake = new Snake();
snake.move();
snake.render(map);
snake.move();
snake.render(map);
snake.move();
snake.render(map);*/