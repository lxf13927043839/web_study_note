/*
* @Author: ASUS
* @Date:   2021-04-14 15:44:15
* @Last Modified by:   ASUS
* @Last Modified time: 2021-04-15 23:26:20
*/
// tool.js
(function () {
	var ToolRandom = {
		getRandom: function (min, max) {
			return Math.floor(Math.random()*(max - min + 1) + min);
		}
	}; 
	window.ToolRandom = ToolRandom;
})();

