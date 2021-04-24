/*
* @Author: ASUS
* @Date:   2021-04-14 17:41:57
* @Last Modified by:   ASUS
* @Last Modified time: 2021-04-15 16:51:03
*/
(function () {
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
})();