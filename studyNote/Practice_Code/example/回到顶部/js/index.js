/*
* @Author: ASUS
* @Date:   2021-04-06 15:52:28
* @Last Modified by:   ASUS
* @Last Modified time: 2021-04-06 16:42:10
*/
var headTop = document.getElementById('top');
var toTop = document.getElementById('totop');
window.onscroll = function () {
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

	if (scrollTop > 10) {
		headTop.className = 'headed fixed';
		toTop.style.display = 'block';
		// console.log('toTop');
	} else {
		headTop.className = 'headed';
		toTop.style.display = 'none';
	}
}
var timeIdFlag = null;
toTop.onclick = function () {
	if (timeIdFlag) {
		clearInterval(timeIdFlag);
		timeIdFlag = null;
	}
	timeIdFlag = setInterval(function () {
		var step = 10;
		var targetDistance = 0;
		var current = document.body.scrollTop || document.documentElement.scrollTop;
		if (targetDistance < current) {
			step = -Math.abs(step);
		}
		if (Math.abs(targetDistance - current) <= Math.abs(step)) {
			document.body.scrollTop = targetDistance;
			document.documentElement.scrollTop = targetDistance;
			clearInterval(timeIdFlag);
			return;
		} else {
			current += step;
			document.body.scrollTop = current;
			document.documentElement.scrollTop = current;
			console.log(current);
		}


	},30)
}