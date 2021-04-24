/*
* @Author: ASUS
* @Date:   2021-04-14 15:43:49
* @Last Modified by:   ASUS
* @Last Modified time: 2021-04-15 23:26:27
*/
// 分号不要忘记了
// 自调用函数，开辟一个新的局部作用域，避免命名冲突
(function () {
		// food.js
	function Food(foodObj) {
		foodObj = foodObj || '';
		this.width = foodObj.width || 20;
		this.height = foodObj.height || 20;
		this.color = foodObj.color || 'red';
		this.x = foodObj.x || 0;
		this.y = foodObj.y || 0;
	}
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
})();

// 测试代码
/*var map = document.getElementById('map');
var food = new Food();
food.render(map);*/