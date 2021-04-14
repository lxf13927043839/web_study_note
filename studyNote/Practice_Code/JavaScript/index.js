/*
* @Author: ASUS
* @Date:   2021-03-24 16:40:14
* @Last Modified by:   ASUS
* @Last Modified time: 2021-04-01 13:28:54
*/


// 处理浏览器的兼容性,后续是不用写的，因为有的库已经帮我们处理好了
function getFirstElementChild(node) {
    var node, nodes = node.childNodes, i = 0;
    while (node = nodes[i++]) {
        if (node.nodeType === 1) {
            return node;
        }
    }
    return null;
}

function getNextElementSibling(element) {
	var el = element;
	while (el = el.nextSibling) {// 这里写成了el = element.nextSibling,造成了死循环
		if (el.nodeType === 1) {
			return el;
		}
	}
	return null;
}

function setInnerText(element, text) {
	if (typeof element.innerText === 'string') {
		element.innerText = text;
	} else {
		element.textContent = text;
	}
}

// 处理兼容性问题
// eventName是不带 on的，如click、mousuover、mouseout
function addEventListener(element, eventName, fn) {
	if (element.addEventListener) {
		element.addEventListener(eventName,fn);
	} else if (element.attachEvent) {
		element.attachEvent('on'+eventName, fn);
	} else {
		//element.onclick,对象的属性也可以写成下边的形式
		element['on'+eventName] = fn;
	}
}

function removeEvent(element, eventName, fn) {
	if (element.removeEventListener) {
		element.removeEventListener(eventName,fn);
	} else if (element.dettach) {
		element.dettach('on'+eventName,fn);
	} else {
		element['on'+eventName] = null;
	}
}

// 页面滚动出去的距离
function getScroll() {
	// document.body.scrollTop); 在chrome中输出0
	// document.documentElement.scrollTop); 在chrome中输出带有小数
	var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	return {
		scrollLeft: scrollLeft,
		scrollTop: scrollTop
	}
}

function getPage(e) {
	var pageX = e.pageX || e.clientX + getScroll().scrollLeft;
	var pageY = e.pageY || e.clientY + getScroll().scrollTop;
	return {
		pageX: pageX,
		pageY: pageY
	}
}