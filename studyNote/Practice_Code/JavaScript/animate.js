/*
* @Author: ASUS
* @Date:   2021-04-04 18:16:10
* @Last Modified by:   ASUS
* @Last Modified time: 2021-04-06 21:18:58
*/
/*
参考最近父元素的定位来进行移动的，根据offsetLeft来计算的left，要注意margin的影响
参数一：元素
参数二：移动的距离
*/
function animateMoving(element, distance) {
	var speed = 10;
	if (element.timeFlag) {
		clearInterval(element.timeFlag);
		element.timeFlag = null;
	}
	if (element.offsetLeft > distance) {
		// 每隔30毫秒程序进来执行一次，第一次是负的，但是再进来一次就成正的，如此循环，所有需要加上绝对值，保证是负的
	 	// speed = -speed;
	 	speed = -Math.abs(speed);
	} 
	// 让多次点击不会重复创建新的定时器
	element.timeFlag = setInterval(function () {
		// 如果不加绝对值，从 0 - 400，这个条件会一直成立，直接跳到目标位置
		// 从 400 - 0，有动画，但是结束的时候，会超过一点目标距离，然后再回来，视觉上有跳动
		if (Math.abs(element.offsetLeft - distance) < Math.abs(speed)) {
			element.style.left = distance + 'px';
			clearInterval(element.timeFlag);
			return;
		}
		element.style.left = element.offsetLeft + speed + 'px';
		console.log('left ='+ element.style.left);
	},10);// 30毫秒，后续看具体要求再看
}